import express from 'express';
import fs from 'fs';
import _ from 'lodash';

const PORT = 3001;
const app = express();
app.use(express.json())
const jPars = express.json()

let rawData = fs.readFileSync('data/videos.json');
let dataFromJSON = JSON.parse(rawData);

app.get('/', (req, res) => {

    let dataFromUser = req.body;

    let final = _.filter(dataFromJSON, function (o) {
        let some = 0;
        for (let i = 0; i < dataFromUser.length; i++) {
            let [sign, keyInObj, valueToFind] = dataFromUser[i];
            if (sign == ">") { o[keyInObj] > valueToFind ? some++ : some }
            if (sign == "<") { o[keyInObj] < valueToFind ? some++ : some }
            if (sign == "strictEquality") {
                if (Array.isArray(valueToFind)||_.isEqual(o[keyInObj], valueToFind)) {
                      some++ 
                } else {
                    o[keyInObj] == valueToFind ? some++ : some
                }
            }
            if (sign == "partialMatch") {
                if (Array.isArray(valueToFind)) {
                    o[keyInObj].find(el => valueToFind.includes(el)) ? some++ : some;
                } else {
                    o[keyInObj].includes(valueToFind) ? some++ : some
                }
            }
        }
        return some == dataFromUser.length ? true : false;
    });
    res.status(200).json(final)
});

async function App() {
    try {
        app.listen(PORT, () => console.log("Server started " + PORT))
    } catch (e) {
        console.log(e);
    }
};

App();
