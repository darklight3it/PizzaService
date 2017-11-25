# Recruitment Excercise

Thank you for taking the time to do our technical test :smiley:. The test consist in delivering us a simple application **on a github repository** of your own.
The test is intended as a **simplified simultation of our daily work**. As a team we put great importance to the **agile methodology**, for this reason the test is divided in **5 milestones**.

In each milestone you will be requested **to improve your code base** in order to meet business requirements. You have to complete the milestones **in order**, for example you can't jump on milestone 5, if you do not have completed the first four.

Do not worry if you can't complete all the milestones, we will review the test anyway and consider and take into account your experience.

### Rules and Hints

* The code base **must be deployed on github**. You can take advantage of [GIT tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging) in order to show us the commit where you consider a milestone finished. Preferably do small and frequent commits.
* You can code it in any language you prefer.
* You can use any library you want.
* The output **must be a simple console application** (no html, forms, webviews, app etc...). 
* Complex task (for example sending an email) **must not be implemented**, you should log the corrisponding action to the console (for example "Email Sent").
* You must complete the milestones **in order**.
* You **should cover** your code with Unit Test.
* Be open for change but do not overengineer your code.
* We will provide *JSON* file in order to test your application. Include them in your code base.

## Milestone 1

Your old time friend Giulio, has recently opened a small business called **Pizza Service s.r.l.** in which he prepares and sells a wonderful pizza at a competitive price. Knowing your coding skills he asks you to develop a small program to let his wife handle the restaurant ever growing orders.

To your amusement Giulio's wife can store the orders in *JSON* format.

```json
[{
    "id": "123456",
    "deliveryTime": "25.11.2017 20:00:00",
    "type": "takeaway",
    "totalPrice": "5€",
    "name": "Alice",
    "surName": "Rossi",
    "products": [{
        "type": "Pizza Margerita",
        "price": "5€",
        "amount": 1
    }]
},
{
    "id": "123457",
    "deliveryTime": "25.11.2017 20:20:00",
    "type": "delivery",
    "totalPrice": "8€",
    "name": "Marco",
    "surName": "Bianchetti",
    "address": "via vittorio veneto, 15",
    "products": [{
        "type": "Pizza Margerita",
        "price": "5€",
        "amount": 1
    },{
        "type": "Coke",
        "price": "3€",
        "amount": 1,
        "capacity": "33cl"
    }]
}]
```

### Requirements

* Create an endpoint/controller that reads from this json file and shows the output to Giulio in this format:


