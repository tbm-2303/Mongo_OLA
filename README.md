# Mongo_OLA

## MongoDB Setup (Standalone)

This section describes the steps used to install and run a standalone MongoDB instance for development.

---

### Step 1: Install MongoDB Community Edition

Download and install MongoDB from the official source:  
[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

- Platform: **Windows**
- Package: **MSI Installer**
- Select the option to **install as a service**

---

### Step 2: Create Data Directory

Create a folder for MongoDB to store its data:

```cmd
mkdir C:\mongodb\data
```

---

### Step 3: Start MongoDB Daemon

Start the MongoDB server:

```cmd
mongod --dbpath C:\mongodb\data
```

This starts the MongoDB daemon and listens on the default port `27017`.

---


### Step 4: Install & Run MongoDB Shell (`mongosh`)

If the shell is not installed, download it from:  
https://www.mongodb.com/try/download/shell

Once installed, open a **new terminal** and run:

```cmd
mongosh
```

Then test the connection:

```cmd
db.stats()
```

---


### Step 5: Download the Dataset

1. Go to:  
   https://github.com/ozlerhakan/mongodb-json-files

2. Click **"Code" → "Download ZIP"**

3. Extract to:

```
C:\mongodb-datasets\
```

You should now have:

```
C:\mongodb-datasets\datasets\twitter\tweets.json
```

---

### Step 6: Import Dataset into MongoDB

Run in a regular terminal (not mongosh):

```cmd
mongoimport --db twitterDB --collection tweets --file C:\mongodb-datasets\datasets\twitter\tweets.json
```

> If `mongoimport` is not recognized, use the full path:

```cmd
"C:\Program Files\MongoDB\Tools\100\bin\mongoimport.exe" --db twitterDB --collection tweets --file C:\mongodb-datasets\datasets\twitter\tweets.json
```

---
The Twitter dataset is now loaded into `twitterDB.tweets`.













