if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const PORT_NUM = 3000;
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.listen(PORT_NUM, () => {
	console.log(`Server started at port: ${PORT_NUM}`);
});

app.get("/", (req, res) => {
	res.redirect("index.html");
});
