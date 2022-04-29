var arraySalvos = JSON.parse(localStorage.getItem("salvos")) || [];

var results = document.getElementById("results");
var resultsSalvos = document.getElementById("results_save");
var resultTitle = document.getElementById("result_title");
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");
var searchNumbers = document.getElementById("searchNumbers");
var clearButton = document.getElementById("clearButton");
var salvar = document.getElementById("salvar");

var response = undefined;




var tmdb = {
  // atributos

  // métodos
  pesquisar: function () {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      encodeURI(
        `https://api.themoviedb.org/3/search/movie?api_key=cb1577bb4988e064535e2a09713cc852&language=pt-br&include_adult=false&query=${searchInput.value}`
      )
    );
    xhr.send(null);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status == 200) {
          response = JSON.parse(xhr.responseText);
          //console.log(response);

          // limpar os resultados anteriores se houverem.
          results.innerHTML = "";
          // apagar o conteúdo da caixa de consulta
          searchInput.value = "";

          // mostrar a quantidade de resultados obtidos
          resultTitle.style.display = "block";

          for (i = 0; i < response.results.length; i++) {
            console.log(response.results[i].poster_path);
            // criar um elemento l1i
            var li = document.createElement("li");

            // criar um elemento img
            var img = document.createElement("img");
            img.setAttribute(
              "src",
              `https://image.tmdb.org/t/p/w500${response.results[i].poster_path}`
            );
            li.appendChild(img);

            // span
            var span = document.createElement("span");
            var spanText = document.createTextNode(response.results[i].title);
            span.appendChild(spanText);
            li.appendChild(span);

            // Paragrafo
            var description;
            if (response.results[i].overview == "") {
              description = "Sem descrição...";
            } else {
              description = response.results[i].overview;
            }

            var paragrafo = document.createElement("p");
            var paragrafoText = document.createTextNode(description);
            paragrafo.appendChild(paragrafoText);
            li.appendChild(paragrafo);
                
            // botão salvar
            var button = document.createElement("button");
            button.innerHTML = "Salvar";  
            button.setAttribute('onclick',`tmdb.salvar(${JSON.stringify(response.results[i])});`);    
            li.appendChild(button);

            // não esquecer de appendar o li
            results.appendChild(li);
          } // fim do for

          // mostra valor dos resultados
          searchNumbers.innerText = `(${response.results.length})`;
        }
      }
    };  
  }, // fim pesquisar

  salvar: function(data){
    console.log(data);
    arraySalvos.push(data);

    localStorage.setItem("salvos", JSON.stringify(arraySalvos));
   
   
    for (i = 0; i <arraySalvos.length; i++) {
      console.log(arraySalvos[i].poster_path);
      // criar um elemento li
      var li = document.createElement("li");

      // criar um elemento img
      var img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500${arraySalvos[i].poster_path}`
      );
      li.appendChild(img);

      // span
      var span = document.createElement("span");
      var spanText = document.createTextNode(arraySalvos[i].title);
      span.appendChild(spanText);
      li.appendChild(span);

      // Paragrafo
      var description;
      if (arraySalvos[i].overview == "") {
        description = "Sem descrição...";
      } else {
        description = arraySalvos[i].overview;
      }

      var paragrafo = document.createElement("p");
      var paragrafoText = document.createTextNode(description);
      paragrafo.appendChild(paragrafoText);
      li.appendChild(paragrafo);
      

      // botão salvar
      var button = document.createElement("button");
      button.innerHTML = "Salvar";  
      button.setAttribute('onclick',`tmdb.salvar(${JSON.stringify(arraySalvos[i])});`);    
      li.appendChild(button);
      searchInput.value = "";
       // apagar valor dos resultados
       searchNumbers.innerText = ``;
       // esconder a quantidade de resultados obtidos
       resultTitle.style.display = "none";
      

      // não esquecer de appendar o li
      results_save.appendChild(li);
    } // fim do for

    // mostra valor dos resultados
    
  },
  

  limpar: function(){
       // limpar os resultados anteriores se houverem.
       results.innerHTML = "";
       // apagar o conteúdo da caixa de consulta
       searchInput.value = "";
       // apagar valor dos resultados
       searchNumbers.innerText = ``;
       // esconder a quantidade de resultados obtidos
       resultTitle.style.display = "none";

  }

  
  
};