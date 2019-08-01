# Lowes Product Description Backend

This is a backend service for product reviews component that is encorporated into a partial clone of the Lowes website.

## Tech stack

Express, MySql, ngnix, pm2, ubuntu

## Technical Challenges: Scaling Up

For this project I inherited a backend service for a product description component. I was tasked with scaling the service up to be able to handle 10M+ records.

### The Database

The service I inherited was written with a Mongo database (+Mongoose). My initial hunch was that a SQL database would be more performant with 10M+ records. To test this hypothesis, I seeded a Mongo database and a MySql database with 10M records and ran performance tests on both.

The Mongo database was not initially indexed on product id's, so finding a single product by id took 47 seconds. After indexing the productId field, query time was reduced to an avergage of 8-12 ms with Mongoose and 5 ms with Mongo (_sans_ Mongoose). But average query time with MySql was much better: under 1 ms per query.

#### Average query time

| Database              | Time   |
| --------------------- | ------ |
| Mongo with Mongoose   | 8 ms   |
| Mongo withou Mongoose | 5 ms   |
| MySql                 | < 1 ms |

### The Server

In order to take advantage of the speed of MySql, I had to refactor the server. In the process, I made the server more restful and moduler, **reducing lines of code in the server file from 550 to 29**.

### Deployment

In order to scale up the deployment, I load tested (i) a single deployment on an AWS ec2.micro instance, and (ii) an nginx load balancer balancing responses between two instances of the service, both on ec2.micro instances. Test results are as follows:

<img src = "/images/image1.png" >
<img src = "/images/image2.png" >
<img src = "/images/image3.png" >
<img src = "/images/image4.png" >

The load balancer significantly increatse the number of requests per second the server can handle.
