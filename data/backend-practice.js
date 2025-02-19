const xhr = new XMLHttpRequest();
//Load means the response has loaded
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});
 
//Get information from the backend
xhr.open('GET', 'https://supersimplebackend.dev');
//Send message across the internet
xhr.send();

//URL paths are parts that comes after a domain name, if there are no url paths. The URL path is the slash "/"\

//Status code that starts with 4 or 5 (400, 404, 500) = failed

//All the URL paths that are supported are called backend API
//API - Application Programming Interface

//Using a browser is the same thing as making a Get Request


