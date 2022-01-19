import express from "express";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("mail api");
});

app.listen(PORT, () => console.log(`app running at port ${PORT}`));