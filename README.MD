Prerequisites:

Homebrew:

Install xcode command line:
xcode-select --install

Install homebrew:
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Confirm homebrew:
brew doctor

Node and NPM:

brew install node
(might need to add the path to the node executable to your system $PATH)

MongoDB:

Install MondoDB:
brew install mongodb

Create MongoDB directory:
mkdir -p /data/db

Set permissions:
sudo chown -R `id -un` /data/db

____________________________________________________________________________________________________________


START MONGO:
mongod

INSTALL SERVER:
CD in to server directory
npm install
nodemon index

INSTALL FRONTEND:
CD in to frontend directory
npm install
npm start

Server is on loclhost:8080
Frontend is on localhost:8080

Testing framework added but not implemented






