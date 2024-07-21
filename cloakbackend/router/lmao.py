from flask import Flask, redirect, request, session, url_for
import requests
import os

app = Flask(_name_)
app.secret_key = os.urandom(24)

# Fitbit API credentials
CLIENT_ID = '23PJ54'
CLIENT_SECRET = '69556a77a24a922452f605a1cb248dfc'
REDIRECT_URI = 'http://localhost'
AUTH_URL = 'https://www.fitbit.com/oauth2/authorize'
TOKEN_URL = 'https://api.fitbit.com/oauth2/token'

@app.route('/')
def home():
    return '<a href="/login">Connect with Fitbit</a>'

@app.route('/login')
def login():
    # Redirect user to Fitbit authorization URL
    auth_params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': 'activity nutrition profile sleep',  # Add required scopes here
        'redirect_uri': REDIRECT_URI,
    }
    auth_url = f"{AUTH_URL}?{requests.compat.urlencode(auth_params)}"
    return redirect(auth_url)

@app.route('/callback')
def callback():
    # Get authorization code from the callback URL
    code = request.args.get('code')
    
    # Exchange authorization code for access token
    token_data = {
        'client_id': CLIENT_ID,
        'grant_type': 'authorization_code',
        'redirect_uri': REDIRECT_URI,
        'code': code,
    }
    response = requests.post(TOKEN_URL, data=token_data, auth=(CLIENT_ID, CLIENT_SECRET))
    token_info = response.json()
    
    # Save access token and refresh token in the session
    session['access_token'] = token_info['access_token']
    session['refresh_token'] = token_info['refresh_token']
    
    return 'Authorization successful!'

@app.route('/profile')
def profile():
    if 'access_token' not in session:
        return redirect(url_for('login'))
    
    headers = {
        'Authorization': f"Bearer {session['access_token']}",
    }
    response = requests.get('https://api.fitbit.com/1/user/-/profile.json', headers=headers)
    
    return response.json()

if _name_ == '_main_':
    app.run(debug=True)