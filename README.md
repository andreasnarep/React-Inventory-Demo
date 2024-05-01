# React Inventory Application Demo

## [Firebase Website Link](https://inventory-demo-narep.web.app/)

## Project Overview

React web application with a REST backend Java API (github repo [link](https://github.com/andreasnarep/Inventory-API-Demo) for API). MongoDB is used for database. The React application is deployed in Firebase and the Java API in Google Cloud App Engine.

## Website Overview
  **Main Page**  - Overview of completed doors/windows for every month. 
  
  **BQ Doors**   - Insertion of completed bq doors.
  
  **BQ Windows** - Insertion of completed bq windows.
  
  **Polo Doors** - Insertion of completed polo doors.
  
  **Inventory**  - Overview of inventory items. Quantity of each item can be edited by clicking on the item.

## Data

> [!NOTE]
> If an item's quantity drops below its lower limit, then it is displayed with a red background in the inventory tab.

**Inventory Items**

| **name (string)** | **quantity (int)** | **lowerLimit (int)** |
| ----------------- | ------------------ | -------------------- |
| 605x1537          | x                  | 5                    |
| 605x1685          | x                  | 7                    |
| asd               | x                  | 8                    |
| 545x775           | x                  | 7                    |
| bgd               | x                  | 10                   |
| 495x775           | x                  | 7                    |


> [!NOTE]
> Materials Array in the following data tables show which material and how much of each corresponding material is used for creating one window/door.

**BQ Doors**

| **name (string)** | **materials (object[])** |
| ----------------- | ------------------------ |
| 1690x1900 1/1     | ["605x1537" - 1, "asd" - 4, "bgd" - 8] |
| 1599x2965 1/2     | ["605x1685" - 2, "bgd" - 1] |

**BQ Windows**

| **name (string)** | **materials (object[])** |
| ----------------- | ------------------------ |
| 1390x1000     | ["605x1537" - 1, "asd" - 4, "bgd" - 8] |
| 1290x1000     | ["605x1685" - 2, "bgd" - 1] |

**Polo Doors**

| **name (string)** | **materials (object[])** |
| ----------------- | ------------------------ |
| 1690x1900 1/1     | ["605x1537" - 2, "asd" - 1, "bgd" - 4] |
| 1690x2050 1/1     | ["605x1685" - 2, "asd" - 4] |

**Completed BQ Doors** (same schema for completed polo doors and bq windows)

| **name (string)** | **date** | **quantity (int)** |
| ----------------- | -------- | ------------ |
| 1690x1900 1/1     | 2024-05-01T00:00:00.000+00:00 | x |
