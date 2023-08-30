// const dateStringArray = []
// aiData.map(date =>{
//   dateStringArray.push(date.published_in)
// }) 
// function compareDateStrings(a, b) {
//   const dateA = new Date(a);
//   const dateB = new Date(b);
//   return dateA - dateB;
// }
// console.log(dateStringArray.sort(compareDateStrings));


const books = [
    { title: 'The Great Gatsby', publishDate: '1925-04-10' },
    { title: 'To Kill a Mockingbird', publishDate: '1960-07-11' },
    { title: '1984', publishDate: '1949-06-08' },
    { title: 'Hello', publishDate: '1939-04-02' },
  ];
  
  books.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
  
  console.log(books);
