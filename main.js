let inputField = document.querySelector(".get-repos input");
let inputBtn = document.querySelector(".get-button");
let dataShow = document.querySelector(".show-data");
// let dataShowField 

inputBtn.addEventListener("click", getRepos);

function getRepos() {
    if (inputField.value === "") {
        dataShow.innerHTML = "<span>Please Write The Username.</span>";
    }
    else {
        dataShow.innerHTML = "";
        fetch(`https://api.github.com/users/${inputField.value}/repos`)
            // if (status)
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => {
                    let mainDiv = document.createElement("div");
                    mainDiv.appendChild(document.createTextNode(element.name));
                    let url = document.createElement("a");
                    url.appendChild(document.createTextNode("Visit"));
                    url.href = `https://github.com/${inputField.value}/${element.name}`;
                    url.target = `_blank`;

                    let starsCount = document.createElement("span");
                    starsCount.appendChild(document.createTextNode(`Stars ${element.stargazers_count}`));
                    mainDiv.appendChild(starsCount);
                    mainDiv.appendChild(url);
                    mainDiv.classList.add("box");
                    dataShow.appendChild(mainDiv);
                });
                // console.log(data);
            }).catch(element => {
                dataShow.innerHTML = "No Users Found.";
            });
    }
}