fetch("https://eduardotoraya.github.io/Lab3/data/grammys.json")
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here

    let newHtml = '';


    let title = data.fields;

    for(let i = 0; i < title.length; i++){
      newHtml += `
        <option value = "${title[i].field_id}">
          ${title[i].field}
        </option>
      `
    }
    $("#category_types").append(newHtml);
    showText(title[0]);

    $("#category_types").on("change", function(event){
      let id = $(this).val();
      for(let i = 0; i < title.length; i++){
        if(id == title[i].field_id){
          showText(title[i]);
        }
      }
    })
  })
  .catch(err => {
    // Do something for an error here
    console.log("Error al cargar datos");
  })

let nominees_section = $("#nominees_section");

function showText(title){
  nominees_section.html("");

  let fTitle = document.createElement('h2');
  fTitle.text = title.field;

  if(title.description){
    let fDesc = document.createElement('p');
    fDesc.classList.add("description");
    nominees_section.append(fDesc);
    fDesc.innerHTML = title.description;
  }

  for(let i = 0; i < title.categories.length; i++){
    showCategory(title.categories[i]);
  }

}


function showCategory(category) {

	let categoryTitle = document.createElement('h3');
	categoryTitle.innerText = category.category_name;
	nominees_section.append(categoryTitle);

	if (category.description) {

		let categoryDescription = document.createElement('p');
    categoryDescription.classList.add('description');
		nominees_section.append(categoryDescription);
		categoryDescription.innerHTML = category.description;
	}



	let nomineesList = document.createElement('ul');
	for (let i = 0; i < category.nominees.length; i++) {

		let won = Boolean(i == category.winner_id);
		nomineesList.appendChild(showNominee(category.nominees[i], won));
	}
	if (category.nominees.length > 0) {

		nominees_section.append(nomineesList);
	}

	nominees_section.append('<hr>');
}

function showNominee(nominee, won) {

	let nomineeListElement = document.createElement('li');
	let nomineeTitle = document.createElement('h4');
	nomineeTitle.innerText = nominee.nominee;
	nomineeListElement.appendChild(nomineeTitle);

	if (won) {

		nomineeTitle.classList.add('winner');
		let winnerText = document.createElement('span');
    winnerText.innerText = "WINNER!";
		nomineeListElement.appendChild(winnerText);

	}

	if (nominee.artist) {

		let artistText = document.createElement('p');
    artistText.classList.add('description')
    nomineeListElement.appendChild(artistText);
		artistText.innerHTML = nominee.artist;
	}

	if (nominee.info) {

		let nomineeInfo = document.createElement('p');
    nomineeInfo.classList.add('description');
		nomineeListElement.appendChild(nomineeInfo);
		nomineeInfo.innerHTML = nominee.info;
	}

	return nomineeListElement;
}
