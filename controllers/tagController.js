import { models } from '../models/index.js';

const { Tag } = models;
// Criar uma nova tag
export const createTag = async (req, res) => {
    try {
        const { name } = req.body;

        // Verificar se o nome já existe
        const existingTag = await Tag.findOne({ where: { name } });
        if (existingTag) {
            return res.status(400).json({ error: "Tag já existe." });
        }

        const tag = await Tag.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar a tag.", details: error.message });
    }
};

// Listar todas as tags
export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar as tags.", details: error.message });
    }
};

// Buscar uma tag por ID
export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: "Tag não encontrada." });
        }

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar a tag.", details: error.message });
    }
};

// Atualizar uma tag
export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(404).json({ error: "Tag não encontrada." });
        }

        // Atualizar o nome
        tag.name = name;
        await tag.save();

        res.status(200).json({ message: "Tag atualizada com sucesso.", tag });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar a tag.", details: error.message });
    }
};

// Deletar uma tag
export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await Tag.destroy({ where: { id } });
        if (!deletedRows) {
            return res.status(404).json({ error: "Tag não encontrada." });
        }

        res.status(200).json({ message: "Tag deletada com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar a tag.", details: error.message });
    }
};






