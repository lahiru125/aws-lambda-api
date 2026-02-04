

++++++++++++START++++++++++++

Creating Progamatic User 
	- IAM -> Users -> Create new user -> Add permissions for Admin and AWSLambda full access
	- Goto user (serverless-helper) -> Security Credentials -> Access keys -> Create access key ->
                    -> Command Line Interface (CLI) -> Next -> Create access key (Save the both keys securelly).

npm install -g serverless

serverless -v (4.31.2)

node -v (v22.18.0)

npm -v (v10.9.3)

serverless v4
-> Run "serverless"  
-> Template: AWS / Node.js / Simple Function
-> name: aws-lambda-nodejs-ts4   
-> Create Or Select An Existing App: Skip Adding An App 
-> AWS Credentials Set-Up Method: · Sign in with AWS Console (Recommended)
-> IAM username: madushan -> This will open the briwser and login with IAM user

Change handler.js as handler.ts (v4 automatically supports typescript)

# This creates the package.json file with default settings
-> npm init -y

# This installs TypeScript and AWS types, which creates node_modules and the lock file
-> npm install --save-dev @types/aws-lambda @types/node typescript

// serverless config credentials --provider aws --key [ACCESS KEY] --secret [SECRET KEY]

Create .tsconfig.json file and update it OR
	-> npx tsc --init
	-> AND Change "verbatimModuleSyntax": false,
	-> AND Add to types ==> "types": ["node"]

Create .env (touch .env)
	WM_USERNAME=NULL
	WM_PASSWORD=NULL
	WM_BASE_URL=https://partnerapi.watermetrics.co.nz:9096


Update "serverless.yaml" file 
Update "handler.ts" file

serverless dev 

serverless deploy

serverless info

++++++++++++END++++++++++++


# Test locally
-> serverless invoke local --function apiHandler

How to send requests with Cookie:
		GET https://partnerapi.watermetrics.co.nz:9096/apiV2/GetData/1234
		Cookie: token=PASTE_YOUR_TOKEN_HERE
		Accept: application/json

		