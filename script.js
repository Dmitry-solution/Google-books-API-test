function showBlock(){
	var xhr = new XMLHttpRequest();
	var file = '';
    xhr.open('GET', 'mock.json', false);
    xhr.send();

    if (xhr.status != 200) {
	  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
	} else {
     	file = JSON.parse(xhr.responseText);
    }
    addDataToPage(file);
}

function showBlockPromise() {
	makeRequest('GET', 'mock.json')
		.then(function(e) {
			addDataToPage(JSON.parse(e.target.response));
		}, function(e) {
			throw e;
		});
}

function makeRequest(method, url) {
	return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}


function clearBlock() {
	document.getElementById('data-box').innerHTML = '';
}

function addDataToPage(file) {
	file.forEach(function(value) {
	  	let items = '';
	  	
	  value.items.forEach(function(element){
	  	items += `<div class="book-item">${addContent(element)}</div>`
	  });
	  document.getElementById('data-box').innerHTML = items;
	});
}

function addContent(element) {
  	let volumeInfo = element.volumeInfo.title;
  	let text = element.searchInfo.textSnippet;

  	let current = `<h3>${volumeInfo}</h3>${addTable(element)}${addImage(element)}<p>${text}</p>${readBook(element)}`;

  	return current;
}

function addTable(obj){
	let {authors, publishedDate, contentVersion, language, country, pageCount, categories} = obj.volumeInfo;

	!!authors ? authors = `<tr><td>Authors:</td><td>${authors}</td></tr>` : authors = "";
	!!publishedDate ? publishedDate = `<tr><td>Date of publish:</td><td>${publishedDate}</td></tr>` : publishedDate = "";
	!!contentVersion ? contentVersion = `<tr><td>Version:</td><td>${contentVersion}</td></tr>` : contentVersion = "";
	!!language ? language = `<tr><td>Language:</td><td>${language}</td></tr>` : language = "";
	!!country ? country = `<tr><td>Country:</td><td>${country}</td></tr>` : country = "";
	!!pageCount ? pageCount = `<tr><td>Quantity of pages:</td><td>${pageCount}</td></tr>` : pageCount = "";
	let link = !!categories ? `<a href="#">${categories}</a>` : "";
	let linkCategory = !!link ? `<tr><td>Categories:</td><td>${link}</td></tr>` : "";
		
	let table = `<table>${authors}${publishedDate}${contentVersion}${language}${country}${pageCount}${linkCategory}</table>`;
	
	return table;
}

function readBook(element) {
	let link = element.volumeInfo.previewLink;
	let reading = `<a class="read-link" href="${link}">Read</a>`;
	return reading;
}

function addImage(element){
	let imageObject = element.volumeInfo.imageLinks;
	let image = `<img src="${imageObject.smallThumbnail}"/>`;
	return image;
}
