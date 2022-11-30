import { DOCUMENTATION } from './constants'
import './style.css'

const menuContentElement = document.querySelector('#menu-content');
const favoritesListElements = document.querySelector('#menu-content > .favorites');
const searchBlockElements = document.querySelector('#menu-content > .search');
const inputSearch = document.querySelector('#menu-search');
const menuTogle = document.querySelector('#menu-toggle');

//Generamos el template para representar los datos
const getDocumentationTemplate = (title, url) => {
  return `
  <li class="favorite-element">
    <a href="${url}">${title}</a>
  </li>
  `;
};

const generateList = (listID, elements) => {
  const ulElement = document.createElement('ul');
  ulElement.id = listID;
  elements.forEach((element) => {
    const docTemplate = getDocumentationTemplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  });
  return ulElement;
}

//Filtramos por favoritos (con valor true) y los añadimos mediante el template como una lista ul
const setupFavoritesList = () => {
  const favorites = DOCUMENTATION.filter(document => document.favorite);
  const favoritesUl = generateList('favorites-list', favorites);
  favoritesListElements.append(favoritesUl);
};

//Normalizamos el string que introduce el usuario
const normalizeText = (text) => text.trim().toLowerCase()

//Funcion del evento: cuando se introduce información en el input
const handleSearch = (event) => {
  const { value } = event.target //Destructuring: es lo mismo que poner: const value = event.target.value;
  
  //Trabajamos con la funcion para normalizar y anormalizamos también en los datos que aportamos en el array de objetos, para que todo tenga el mismo formato y eliminemos posibles errores en el futuro
  const normalizeValue = normalizeText(value);
  const filteredDocumentation = DOCUMENTATION.filter(doc => {
    const normalizedTitle = normalizeText(doc.title);
    return normalizedTitle.includes(normalizeValue);
  })

  //Mostramos el resultado de la búsqueda
  const searchUl = generateList('search-list', filteredDocumentation)

  //Eliminamos el anterior, para que no se generen continuamente resultados de búsqueda al escribir cada letra
  const previousUl =document.querySelector('#search-list')
  if(previousUl){
    previousUl.remove();
  }
  
  //Y lo añadimos:
  searchBlockElements.append(searchUl);
}

const toggleOpenMenu = () => {
  
  menuContentElement.classList.toggle('menu-content--open')
}

menuTogle.addEventListener('click', toggleOpenMenu);

inputSearch.addEventListener('input', handleSearch);

setupFavoritesList();