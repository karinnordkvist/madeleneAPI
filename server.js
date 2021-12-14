import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import netflixData from './data/netflix-titles.json';
import res from 'express/lib/response';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'

// import topMusicData from './data/top-music.json'

const mongoUrl =
	process.env.MONGO_URL || 'mongodb://localhost/project-mongo-netflix';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//A show database model to start populating the database
//shows all the existing data
const Show = mongoose.model('Show', {
	show_id: Number,
	title: String,
	director: String,
	cast: String,
	country: String,
	date_added: String,
	release_year: Number,
	rating: String,
	duration: String,
	listed_in: String,
	description: String,
	type: String,
});

//Function to start seeding the database,
//and it will only run when variable is present and true
if (process.env.RESET_DB) {
	console.log('Resetting database!');
	const seedDataBase = async () => {
		//Deletes pre-existing shows to prevent duplicates
		await Show.deleteMany({});

		//Creates a new show
		netflixData.forEach((netflixData) => {
			new Show(netflixData).save();
		});
	};

	seedDataBase();
}

//RESTful route

// Start defining your routes here
app.get('/', (req, res) => {
	res.send('Hello world, welcome to netflix titles API by Madelene Trang');
});

//endpoint to get all shows
app.get('/shows', async (req, res) => {
	const allShows = await Show.find();
	res.json(allShows);
});

//----SINGLE RESULT------
//get a single show based on the title
app.get('shows/:title', async (req, res) => {
	try {
		const singleShowTitle = await Show.findOne({ title: req.params.title });
		if (singleShowTitle) {
			res.json(singleShowTitle);
		} else {
			res.status(404).json(`Sorry, no show can be found with that title `);
		}
	} catch (err) {
		res.status(400).json({ error: 'Invalid title, please try again' });
	}
});

//get a single show based on the show's unique id
app.get('shows/:id', async (req, res) => {
	try {
		const singleShowID = await Show.find({ show_id: req.params.show_id });
		if (singleShowID) {
			res.status(200).json(singleShowID);
		} else {
			res.status(404).json(`Sorry, the id can not be found`);
		}
	} catch (err) {
		res.status(400).json({ error: 'Invalid id, please try again' });
	}
});

// Start the server
app.listen(port, () => {
	// eslint-disable-next-line
	console.log(`Server running on http://localhost:${port} YAY`);
});
