# Recruitment Test

Thank you for taking the time to do our technical test :smiley:. 
The test consists in delivering a simple application **on a github repository** of your own; you can consider it as a **simplified simultation of our daily work**. 

As a tech team we put great importance to the **agile methodology**, for this reason the test is divided in **5 milestones**. In each milestone you will be requested **to improve your code base** in order to meet business requirements. You have to complete the milestones **in order**, for example you can't jump on milestone 5, if you do not have completed the first four.

Do not worry if you can't complete all the milestones, **we will review your work anyway and consider and take into account your experience**.

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
* You have 3 days to complete the excercise.

## Milestone 1

Your old time friend Giulio, has recently opened a small business called **Pizza Service s.r.l.** in which he prepares and sells a wonderful pizza at a competitive price. Knowing your coding skills he asks you to develop a small program to let his wife handle the restaurant ever growing orders.

To your amusement Giulio's wife can store the orders in *JSON* format.

```json
{
	"orders":[

		{
			"customer": "Luigi",
			"type": "pickup_in_store",
			"orderTime": "2017-11-24 10:00",
			"deliveryTime": "2017-11-24 13:00",
			"items": [
				{
					"type": "drink",
					"name": "beer",
					"quantity": 2,
					"unitPrice": 3.5
				}, {
					"type": "drink",
					"name": "water",
					"quantity": 1,
					"unitPrice": 1.0
				}, {
					"type": "dish",
					"name": "pizza",
					"quantity": 3,
					"unitPrice": 7.0
				}
			]
		},
		{
			"customer": "Guido",
			"type": "pickup_in_store",
			"orderTime": "2017-11-24 10:30",
			"deliveryTime": "2017-11-24 12:30",
			"items": [{
					"type": "drink",
					"name": "beer",
					"quantity": 4,
					"unitPrice": 3.5
				}, {
					"type": "dish",
					"name": "pizza",
					"quantity": 2,
					"unitPrice": 7.0
				}, {
					"type": "dish",
					"name": "pasta",
					"quantity": 2,
					"unitPrice": 10.0
				}
			]
		},
		{
			"customer": "Francesco",
			"type": "takeaway",
			"orderTime": "2017-11-24 11:00",
			"deliveryTime": "2017-11-24 12:00",
			"address" : "via ferrari 1",
			"distance" : "800m",
			"items": [{
					"type": "dish",
					"name": "pizza",
					"quantity": 2,
					"unitPrice": 7.0
				}
			]
		},
		{
			"customer": "Mach",
			"type": "takeaway",
			"orderTime": "2017-11-25 12:00",
			"deliveryTime": "2017-11-25 13:00",
			"address" : "route 66",
			"distance" : "4.2km",
			"items": [{
					"type": "dish",
					"name": "pizza",
					"quantity": 8,
					"unitPrice": 7.0
				}
			]
		}
		
	]
}
```

### Requirement

* Create an endpoint/controller that reads from this json file and shows the output to Giulio. Giulio needs them ordered by **orderTime**, *"first come, first served"* .




