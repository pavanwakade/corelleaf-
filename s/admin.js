document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api';

    // --- Element Selectors ---
    const vacancyForm = document.getElementById('vacancy-form');
    const vacanciesList = document.getElementById('vacancies-list');
    const projectForm = document.getElementById('project-form');
    const projectsList = document.getElementById('projects-list');

    // --- Helper Functions ---
    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`);
            if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            alert(`Could not load ${endpoint}. Is the server running?`);
            return [];
        }
    };

    const postData = async (endpoint, data) => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`Error posting to ${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            alert(`Could not save ${endpoint}.`);
        }
    };

    const deleteData = async (endpoint, id) => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`Error deleting from ${endpoint}`);
            if (response.status === 204) {
                return;
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            alert(`Could not delete from ${endpoint}.`);
        }
    };

    // --- Render Functions ---
    const renderVacancies = (vacancies) => {
        vacanciesList.innerHTML = '';
        vacancies.forEach((vacancy, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <h4>${vacancy.title}</h4>
                    <p>${vacancy.location}</p>
                </div>
                <button class="btn delete-btn" data-id="${index}">Delete</button>
            `;
            vacanciesList.appendChild(li);
        });
    };

    const renderProjects = (projects) => {
        projectsList.innerHTML = '';
        projects.forEach((project, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <h4>${project.title}</h4>
                    <p>${project.category}</p>
                </div>
                <button class="btn delete-btn" data-id="${index}">Delete</button>
            `;
            projectsList.appendChild(li);
        });
    };

    // --- Event Listeners ---
    vacancyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newVacancy = {
            title: document.getElementById('vacancy-title').value,
            location: document.getElementById('vacancy-location').value,
            description: document.getElementById('vacancy-desc').value,
            requirements: document.getElementById('vacancy-reqs').value.split(',').map(s => s.trim()),
        };
        await postData('vacancies', newVacancy);
        loadAllData();
        vacancyForm.reset();
    });

    projectForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newProject = {
            title: document.getElementById('project-title').value,
            category: document.getElementById('project-category').value,
            image: document.getElementById('project-image').value,
            description: document.getElementById('project-desc').value,
            link: document.getElementById('project-link').value,
        };
        await postData('projects', newProject);
        loadAllData();
        projectForm.reset();
    });

    vacanciesList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this vacancy?')) {
                await deleteData('vacancies', id);
                loadAllData();
            }
        }
    });

    projectsList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this project?')) {
                await deleteData('projects', id);
                loadAllData();
            }
        }
    });

    // --- Initial Load ---
    const loadAllData = async () => {
        const vacancies = await fetchData('vacancies');
        renderVacancies(vacancies);

        const projects = await fetchData('projects');
        renderProjects(projects);
    };

    loadAllData();
});
