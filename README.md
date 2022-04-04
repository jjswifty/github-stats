## Github app for stats checking 

### Some info

This application will allow everyone to check some info about anybody on github (like login, rep count, etc.).
Also, this application uses apollo without third party state managers. 
This is a kind of experiment - how convenient it will be with an increase in the size of the project.

### How to:

- yarn apollo service:download --endpoint=https://api.github.com/graphql --header="Authorization: Bearer YOUR_GITHUB_API_TOKEN"
- yarn run apollo:generate

This 2 scripts allow you to download public graphql schema and generate types for schemas. 

### How to write some local queries:

- First, you need to define type policy for your field.
- Second, create a query with @client directive.
- Third, initialize new reactive variable. Or you can use cache.writeQuery to store your field.
- And finally - run "yarn run apollo:generate" to generate types for your new query.

Remember, you need to regenerate your types each time you write a new query (not only local).
You can see look inside this repository to learn more.





