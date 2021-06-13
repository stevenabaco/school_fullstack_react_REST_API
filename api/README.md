# <p align="center">REST API - SCHOOL APP - Teamtree Project 9</p> 

# <p align="center"><a href="https://teamtreehouse.com/techdegree/full-stack-javascript">TREEHOUSE - FULL STACK </a> TECHDEGREE 👍 </p>

## PROJECT OVERVIEW

This REST API is the back-end of my Teamtree TechDegree capstone project. It provides a way to manage a school database containing information about users and courses. 

Users should be able to interact with the database to:

<ul> 
<li>Create new courses</li>
<li>Retrieve information on existing courses</li>
<li>Update or Delete existing courses</li>
</ul>
For security reasons, the app utilizes user Authorization to restrict access to information based on users being authorized prior to being able to access the information. 



## EXTRA FEATURES & CUSTOM MODS

<ul>
  <li>Add validation to User email to ensure new email accounts are unique and properly formatted</li>
  <li>Add filter to Users GET route to filter out password, createdAt, and updatedAt</li>
  <li>Add validation to Users to handle SequelizeUniqueContraintsError as 400 status code </li>
  <li>Fliter Courses route to not show createdAt and updatedAt</li>
  <li>Add athentication to users to ensure only authenticated users can edit a courses</li>
</ul>

## TOOLS
<ul>
  <li>Javascript</li>
  <li>Express</>
  <li>Sequelize</li>
  <li>HTML</li>
  <li>CSS</li>
  <li>SQLite</li>
</ul>