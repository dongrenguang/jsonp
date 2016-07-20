const express = require("express");
const app = express();

app.use(express.static("./public"));

app.get("/jsonp", (req, res, next) => {
    const methodName = req.query.method;
    const args = JSON.parse(req.query.args);
    const callbackName = req.query.callbackName;

    let result = null;
    const method = module.exports[methodName];
    if (typeof method === "function")
    {
        result = {
            successful: true,
            result: method(args)
        };
    }
    else
    {
        result = {
            successful: false,
            error: {
                message: `Function ${methodName} is not in exports.`
            }
        };
    }

    res.type(".js");
    setTimeout(() => {
        res.send(callbackName + "(" + JSON.stringify(result) + ")");
    }, Math.random() * 1000);
});

app.listen(8080, () => {
    console.log("The server is running now...");
});




function sum(args)
{
    return args.reduce((prev, cur) => prev + cur);
}

exports.sum = sum;
