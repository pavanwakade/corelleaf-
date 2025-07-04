const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PROJECTS_PATH = path.join(__dirname, 'projects.json');
const VACANCIES_PATH = path.join(__dirname, 'vacancies.json');

// --- Helper Functions ---
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return []; // Return empty array if file doesn't exist
        throw error;
    }
};

const writeFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// --- API Routes ---

// Get all projects
app.get('/api/projects', async (req, res) => {
    const projects = await readFile(PROJECTS_PATH);
    res.json(projects);
});

// Add a project
app.post('/api/projects', async (req, res) => {
    const projects = await readFile(PROJECTS_PATH);
    projects.push(req.body);
    await writeFile(PROJECTS_PATH, projects);
    res.status(201).json(req.body);
});

// Delete a project
app.delete('/api/projects/:id', async (req, res) => {
    const projects = await readFile(PROJECTS_PATH);
    const projectId = parseInt(req.params.id, 10);
    if (projectId >= 0 && projectId < projects.length) {
        projects.splice(projectId, 1);
        await writeFile(PROJECTS_PATH, projects);
        res.status(204).send();
    } else {
        res.status(404).send('Project not found');
    }
});

// Get all vacancies
app.get('/api/vacancies', async (req, res) => {
    const vacancies = await readFile(VACANCIES_PATH);
    res.json(vacancies);
});

// Add a vacancy
app.post('/api/vacancies', async (req, res) => {
    const vacancies = await readFile(VACANCIES_PATH);
    vacancies.push(req.body);
    await writeFile(VACANCIES_PATH, vacancies);
    res.status(201).json(req.body);
});

// Delete a vacancy
app.delete('/api/vacancies/:id', async (req, res) => {
    const vacancies = await readFile(VACANCIES_PATH);
    const vacancyId = parseInt(req.params.id, 10);
    if (vacancyId >= 0 && vacancyId < vacancies.length) {
        vacancies.splice(vacancyId, 1);
        await writeFile(VACANCIES_PATH, vacancies);
        res.status(204).send();
    } else {
        res.status(404).send('Vacancy not found');
    }
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Admin panel is available at http://localhost:${PORT}/admin.html`);
});
