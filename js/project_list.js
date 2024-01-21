// Project card generator

function createProjectCard(parent, projectData, statuses, technologies) {
    const projectTemplate = document.getElementById("project-template");
    let project = document.createElement("div");
    project.innerHTML = projectTemplate.innerHTML;
    project.classList.add("project");

    // Title
    let titleNode = project.querySelector(".content > .title");
    titleNode.title = titleNode.innerText = projectData.title;
    project.classList.add("project");

    // Short Description
    let descriptionNode = project.querySelector(".content > .description");
    descriptionNode.title = descriptionNode.innerText = projectData.short_description;

    // Logo
    let logoNode = project.querySelector(".logo-content > .logo");
    logoNode.onerror = function() {
        logoNode.src = "img/icon_placeholder.svg";
    }
    logoNode.src = `img/projects/${projectData.id}/logo.png`;
    logoNode.alt = projectData.title;

    function setStatus(node, status) {
        node.src = `img/statuses/${status}.svg`;
        node.alt = node.title = statuses[status];
    }

    // Status
    let statusNode = project.querySelector(".logo-content > .status");;
    statusNode.onerror = function() {
        setStatus(statusNode, "unknown");
    }
    setStatus(statusNode, projectData.status);

    // Technologies
    let technologiesNode = project.querySelector(".content > .technologies");
    projectData.technologies.forEach((technology) => {

        let technologyNode = document.createElement("img");
        technologyNode.src = `img/logos/${technology}.svg`
        technologyNode.alt = technologyNode.title = technologies[technology];
        technologyNode.onerror  = function() {
            console.error(`Logo for technology "${technology}" not found!`);
            technologyNode.remove();
        }

        technologiesNode.appendChild(technologyNode);
    })

    parent.appendChild(project);
}

const projectsNode = document.getElementById("projects");


fetch("./data/projects.json")
    .then((res) => { return res.json() })
    .then((projects) => {

        fetch("./data/statuses.json")
            .then((res) => {
                return res.json();
            })
            .then((statuses) => {

                fetch("./data/technologies.json")
                    .then((res) => {
                        return res.json();
                    })
                    .then((technologies) => {

                        projects.forEach((project) => {
                            createProjectCard(projectsNode, project, statuses, technologies);
                        })

                        if (projects.length === 0) {
                            let emptyTextNode = document.createElement("p");
                            emptyTextNode.innerText = "Отсутствуют";
                            emptyTextNode.classList.add("emptyText");
                            emptyTextNode.classList.add("text");
                            projectsNode.appendChild(emptyTextNode);
                        }
                    });
            });
    });

// Auto Year In Footer

let footer = document.getElementById("auto-year-footer");
footer.innerText = "© FieryCup " + new Date().getFullYear();
