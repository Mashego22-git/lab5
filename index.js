  
const { error } = require('console');
const express = require('express')
const app = express ();
app.use(express.json());

const Books = [
   
]


const PORT = 3000;


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });



app.get("/whoami", (request, response) => {
    const status = {
      "studentNumber": "2654606"
    };

    
    response.send(status);
 });



app.get("/books", (request, response) => {
    

    Books.forEach((book) => {
        response.send(
            JSON.stringify(book, null, 2)
        );
      });

 });




app.get("/books/:id", (request, response) => {
  
    ID = request.params.id;
    const book = Books.find((book)=>book.id === ID);
    if(book){
        response.send(
            JSON.stringify(book, null, 2)
        );
    }else{
        response.status(404).json();
    }
 });





app.post("/books", (request, response) => {
    
    const {id,title,details} = request.body;
    

    if(id && title &&details){

    if(id === "" || title === "" || details[0].length ===0){

        response.status(400).send();
        
    }

    Books.push({id,title,details});
    response.send("Book added");
}
response.status(400).send();
    
   

 });


app.post("/books/:id/details", (request, response) => {

    const id = request.params.id;

    const {details} = request.body;
    const book = Books.findIndex((book)=>book.id === id);

    if(book>=0){
        Books[book].details.push(details[0]);
        response.send("Book updated");

    }else{
        response.status(400).send();
    }
response.status(400).send();
  
    
});




// Updates an existing book's information.
app.put("/books/:id", (request, response) => {

    const {id,title,details} = request.body
    const book = Books.findIndex((book)=>book.id === id);

    if(book!=-1){
        Books.splice(book,1);
        Books.push({id,title,details} );
        response.send("Book updated");

    }else{
        response.status(400).send();
    }
  
    
 });


app.delete("/books/:id", (request, response) => {

    const Id = request.params.id;
    const book = Books.find((book)=>book.id === Id);

    if(book !=-1){
        Books.splice(book,1);
        response.send("Book deleted");
    }else{
        response.status(404).send();
    }
  
    
});







app.delete("/books/:id/details/:detailId", (request, response) => {

    const Id = request.params.id;
    const detailsID = request.params.detailId;
    const book = Books.findIndex((book)=>book.id === Id);

   if(book>=0){
    const a= Books[book].details
    const bookD = a.findIndex((index)=>index.id === detailsID);
    if(bookD !=-1){
        a.splice(bookD,1);
        response.send("Details deleted");
    }else{
        response.status(404).send();
    }
   
   }else{
    response.status(404).send();
   }
     
});





