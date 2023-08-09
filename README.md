# Duel.it

## Deck Building Made Easy

Duel.it is a fully functional and efficient way to create your own Yu-Gi-Oh Decks. This application was made for hardcore Yu-Gi-Oh fans that want to build their own decks and determine how much the deck costs

* Allows users to look up any card and quickly add them to a deck with any quantity ranging from one to three
* Displays the pricing of every card at top sites of availability such as Amazon or Ebay
* Quick and easy sorting of cards into their respective sections which allows users to easily swap a card's section

## Technologies Used
* Vite/React
* TailwindCSS
* Redux
* Python/Flask
* JWT
* SQLite
* YGOProDeck API

## How to use

coming soon

## How to contribute
1. Download the project and add the environment variables to both the backend and frontend folders (.env in the back and .env.local in the front).
2. Run ```pip install requirements.txt``` to download all the project dependencies
3. Run ```python run.py``` on the backend and ```npm run dev``` on the frontend

### Environment Variables Needed

Backend:
* ```SECRET_KEY``` = Generated using an online password generator
* ```DB_NAME``` = Your database name of choice
* ```JWT_SECRET_KEY``` = Generated using an online password generator
* ```PORT``` = Your port number of choice (make sure it is not the same as your frontend port number)
* ```YUGIOH_BASE_URL``` = Base URL for the YGOProDeck Api 

Frontend:
* ```VITE_API_URL``` = Your Server URL, whether deployed or on localhost

## Find Any Bugs?

If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above. If you would like to submit a Pull Request with a fix, reference the issue that you created.

## Known Issues
1. When the menu to change the deck privacy and name closes, both attributes are updated even if the button to save has not been pressed

## Future Plans
1. Further styling of the page, potential change of the footer and the font
2. Displaying the total price sum of all cards in a deck
