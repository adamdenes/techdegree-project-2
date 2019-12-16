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
   
   // add searchbar to the page 
   const searchWrapper = document.querySelector('.cf');
   let searchbar =
      `
      <div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
      </div>
      `;
   searchWrapper.innerHTML = searchbar;

   // declaring variables for the search function
   const button = searchWrapper.querySelector('button');
   const names = document.querySelectorAll('.student-details h3');
   const input = searchWrapper.querySelector('input');

   // creating function that handles the search input + 'click and 'keyup' events
   function handleSearch(inputValue, name) {
      // keep the pageArray in within the function scope so it saves only the latest search results
      const pageArray = [];
      const div = document.querySelector('.pagination');
      const ul = document.querySelector('.pagination ul');

      // each name in the students list will be filtered against the if statement
      name.forEach(studentName => {
         // hide everything first
         studentName.parentNode.parentNode.style.display = 'none';
         // if the "database" contains the input we search for, display the list items and push it to the pageArray
         if (studentName.textContent.toLowerCase().includes(inputValue.value.toLowerCase())) {
            studentName.parentNode.parentNode.style.display = 'block';
            pageArray.push(studentName.parentNode.parentNode);
         }
      });

      // remove the ul tag, since after every search, a new line of div\ul will be on the page, wich we don't want
      div.remove(ul);

      const studentList = document.querySelector('.student-list');
      const noResult = document.createElement('li');

      // remove all alarms before checking if the array is empty
      studentList.lastElementChild.remove(noResult);
      // if the search is successful, the pageArray shouldn't be empty
      if (pageArray.length === 0) {
         // if the array has 0 elements, tell the user
         noResult.textContent = `No results have been found for '${input.value}'.`;
         studentList.append(noResult);
      } 

      // call the showPage and appendPageLinks functions with the new pageArray
      showPage(pageArray, 1);
      appendPageLinks(pageArray, pageArray.length);
   }
   
   // create event listeners and call the handleSearch function once the event fires up
   button.addEventListener('click', (event) => {
      event.preventDefault();
      handleSearch(input, names);
   });

   input.addEventListener('keyup', () => {
      handleSearch(input, names);
   });

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
   const appendPageLinks = list => {
      // set the maximum page number to a variable
      const maxNumberOfPages = Math.ceil(list.length / itemsPerPage);
      // select the 'page' div
      const pageDiv = document.querySelector('.page');
      // create the div for pagination, add the class to it and append it to the 'page' div
      const paginationDiv = document.createElement('div');
      paginationDiv.classList.add('pagination');
      pageDiv.appendChild(paginationDiv);
      // create the parent elemt for the list items and append it to the 'pagination' div
      const ul = document.createElement('ul');
      paginationDiv.appendChild(ul);

      // loop over the maximum number of pages
      for (let j = 0; j < maxNumberOfPages; j++) {
         // create as much 'li' and 'a' tag as the max page number
         const li = document.createElement('li');
         const a = document.createElement('a');

         // set the href attribute
         a.href= '#'
         // set the textContent of the links to the index number
         a.textContent = `${j + 1}`;
         // if the index is 0, the set the class to 'active'
         j === 0 ? a.className = 'active' : null;
  
         li.appendChild(a);
         ul.appendChild(li);
         
         // create the event listener for a click event
         a.addEventListener('click', (e) => {
            // selecting all the links withing the div with pagination class
            const anchors = document.querySelectorAll('.pagination a');
            // for each link remove the 'active class upon click event
            anchors.forEach(anchor => anchor.classList.remove('active'));
            // add 'active' class only for the actual event target
            e.target.classList.add('active');
            // call the showPage function for the appropriate page number
            showPage(list, parseInt(e.target.textContent));
         });
      }
   }
   // starting from page #1 and calling the function 'appendPageLinks'
   showPage(students, 1);
   appendPageLinks(students);
});