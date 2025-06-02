#  MongoDB Sharding and Hashtag Analysis Assignment

---

## a) What is sharding in MongoDB?

**Sharding** in MongoDB is a method of **horizontal scaling** used to distribute large amounts of data across multiple servers (called shards). Each shard contains a subset of the data, which allows MongoDB to handle large data volumes and high-throughput operations more efficiently.

---

## b) What are the different components required to implement sharding?

To implement sharding in MongoDB, the following components are required:

- **Shard**: A MongoDB server or replica set that stores part of the sharded data.
- **Config Servers**: Store metadata and configuration settings for the entire sharded cluster.
- **mongos Router**: Acts as a query router between the application and the shards.

---

## c) Explain architecture of sharding in MongoDB

- **Clients** interact with the **`mongos` router**, not the shards directly.
- **`mongos`** looks up the shard key in the **config servers** and routes the query to the correct shard.
- **Data** is split across shards using a **shard key**, which defines how documents are partitioned.

## d) Provide implementation of map and reduce function

To find the **top 10 hashtags** used in the tweets, we can use the `mapReduce` function on the `tweets` collection.

###  Map Function:
The map function emits each hashtag found in the tweets`entities.hashtags` array.


```javascript
var map = function () {
  if (this.entities && this.entities.hashtags) {
    this.entities.hashtags.forEach(function (tag) {
      emit(tag.text.toLowerCase(), 1);
    });
  }
};
```

Reduce Function:
The reduce function sums up the counts of each hashtag.

```javascript
var reduce = function (key, values) {
  return Array.sum(values);
};
```

Output Collection:
We output the results to a new collection named hashtag_counts.

```javascript
db.tweets.mapReduce(
  map,
  reduce,
  {
    out: "hashtag_counts"
  }
);
```

## e) Provide execution command for running MapReduce

This will create a new collection called hashtag_counts containing the hashtags and their usage counts.

To retrieve the top 10 most used hashtags:
```javascript
db.hashtag_counts.find().sort({ value: -1 }).limit(10);
```

## f) Provide top 10 recorded out of the sorted result

The following are the **top 10 hashtags** found using the MapReduce approach on the dataset:

```json
[
  { "_id": "nodejs", "value": 29 },
  { "_id": "angularjs", "value": 29 },
  { "_id": "fcblive", "value": 27 },
  { "_id": "javascript", "value": 22 },
  { "_id": "globalmoms", "value": 19 },
  { "_id": "lfc", "value": 19 },
  { "_id": "espanyolfcb", "value": 18 },
  { "_id": "webinar", "value": 18 },
  { "_id": "iwci", "value": 17 },
  { "_id": "job", "value": 13 }
]

```

- The ´my-next-app´ is a simple next.js app. The app supports functionality for getting the 10 first tweets and a form to submit new tweets. 
- The "mongodb-shard" is the local configuration setup. 
- **Shards**: We created two replica sets: `shard1ReplSet` and `shard2ReplSet`. Each consists of three `mongod` instances (on ports 27001–27003 and 27101–27103 respectively).
- **Config Server**: A replica set of three config server instances was used (on ports 26001–26003).
- **Mongos Router**: A single `mongos` instance (on port 27017) served as the router and entry point to the sharded cluster.
- **Dataset**: A Twitter dataset (in `.bson` format) was imported into the cluster.
- **Sharding Key**: We used `"user.id"` as the shard key, and manually split the data at the midpoint of the value range to distribute the tweets across both shards.









