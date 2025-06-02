#  MongoDB Sharding and Hashtag Analysis Assignment

---

## a What is sharding in MongoDB?

**Sharding** in MongoDB is a method of **horizontal scaling** used to distribute large amounts of data across multiple servers (called shards). Each shard contains a subset of the data, which allows MongoDB to handle large data volumes and high-throughput operations more efficiently.

---

## b What are the different components required to implement sharding?

To implement sharding in MongoDB, the following components are required:

- **Shard**: A MongoDB server or replica set that stores part of the sharded data.
- **Config Servers**: Store metadata and configuration settings for the entire sharded cluster.
- **mongos Router**: Acts as a query router between the application and the shards.

---

## c Explain architecture of sharding in MongoDB

- **Clients** interact with the **`mongos` router**, not the shards directly.
- **`mongos`** looks up the shard key in the **config servers** and routes the query to the correct shard.
- **Data** is split across shards using a **shard key**, which defines how documents are partitioned.

## d) Provide implementation of map and reduce function

To find the **top 10 hashtags** used in the tweets, we can use the `mapReduce` function on the `tweets` collection.

### 🧠 Goal:
Extract hashtags from each tweet, count their occurrences, and store the result in a new collection called `hashtag_counts`.

### 🗺️ Map Function:
The map function emits each hashtag found in the tweet’s `entities.hashtags` array.


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










