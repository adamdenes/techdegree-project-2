/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// making sure the markup + CSS loads before JavaScript 
// (although the script tag is at the end of the body)
document.addEventListener('DOMContentLoaded', () => {

   // declaring students global variable, which holds the value of the list items
   const students = document.querySelectorAll('.student-item');
   // declaring itemsPerPage global variable, which holds the maximum items allowed to load on screen
   const itemsPerPage = 10;

   // creating showPage function to show only the 10 (or less) allowed elements per page
   const showPage = (list, page) => {

      // creating startIndex variable to hold the 10 items per page
      const startIndex = (page * itemsPerPage) - itemsPerPage;
      // creating endIndex variable to hold the remaining items on the last page
      const endIndex = page * itemsPerPage;

      // looping over the students array
      for (let i = 0; i < list.length; i++) {
         
         // display `li` tags if its index is >= than startIndex && < endIndex
         if (startIndex <= i && endIndex > i) {      
            list[i].style.display = 'block';
            // hide everything else on the page
         } else {
            list[i].style.display = 'none';
         }
         
      }
   }
   // Create the `appendPageLinks function` to generate, append, and add 
   // functionality to the pagination buttons.
   function appendPageLinks(list) {
      
      const maxNumberOfPages = Math.ceil(list.length / itemsPerPage);
      const pageDiv = document.querySelector('.page');
      
      const paginationDiv = document.createElement('div');
      paginationDiv.classList.add('pagination');
      pageDiv.appendChild(paginationDiv);

      const ul = document.createElement('ul');
      paginationDiv.appendChild(ul);

      for (let j = 0; j < maxNumberOfPages; j++) {

         const li = document.createElement('li');
         const a = document.createElement('a');

         a.href= '#'
         a.textContent = `${j + 1}`;
         j === 0 ? a.className = 'active' : null;
  
         li.appendChild(a);
         ul.appendChild(li);
           
         a.addEventListener('click', (e) => {
            const anchors = document.querySelectorAll('.pagination a');

            for (let k = 0; k < anchors.length; k++) {
               anchors[k].classList.remove('active');
            }
            e.target.classList.add('active');
            showPage(list, parseInt(e.target.textContent));
         });
      }
   }

   showPage(students, 1);
   appendPageLinks(students);
});