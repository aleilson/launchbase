const { date } = require('../../lib/utils')
const Receipt = require('../models/Receipt')
const File = require('../models/File')
const RecipeFile = require('../models/RecipeFile')

module.exports = {
  async index(req, res) {
    try {

      let results = await Receipt.all();
      const recipes = results.rows;

      async function getImage(recipeId) {
        const results = await RecipeFile.find(recipeId);
        const files = results.rows.map(file => ({
          ...file,
          src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        return files[0];
      }

      const filesPromise = await results.rows.map(recipe => getImage(recipe.id));
      const recipesFiles = await Promise.all(filesPromise);

      return res.render('admin/recipes/index', {recipes, recipesFiles});
    } catch (err) {
      throw new Error(err);
    }
  },

  create(req, res) {
    Receipt.chefsSelectOptions()
      .then(function (results) {
        const chefOptions = results.rows
        return res.render("admin/recipes/create", {
          chefOptions
        })

      }).catch(function (err) {
        throw new Error(err)
      })
  },

  async post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '' && key != 'removed_files') {
        return res.send('Please fill all fields')
      }
    }

    if (req.files.length == 0) {
      return res.send('Please, send at least one image')
    }

    let results = await Receipt.create(req.body)
    const recipeId = results.rows[0].id

    const filesPromise = req.files.map(file => File.create({...file}))
    results = await Promise.all(filesPromise)

    const recipeFiles = results.map(result => result.rows[0])
    const recipeFilesPromise = recipeFiles.map(file => RecipeFile.create(file.id, recipeId));
    results = await Promise.all(recipeFilesPromise);

    return res.redirect(`/admin/recipes/${recipeId}/edit`)
  },
  async show(req, res) {
    const recipeId = req.params.id

    let results = await Receipt.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) return res.send("Receipt not found!!")

    recipe.created_at = date(recipe.created_at).format

    results = await RecipeFile.findByRecipeId(recipeId);
    const recipeFilesPromise = results.rows.map(file => File.find(file.file_id));
    results = await Promise.all(recipeFilesPromise);

    let recipeFiles = results.map(result => result.rows[0]);
    recipeFiles = recipeFiles.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`,
    }));

    return res.render("admin/recipes/show", {
      recipe,
      recipeFiles
    })
  },
  async edit(req, res) {
    const recipeId = req.params.id

    let results = await Receipt.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) return res.send("Receipt not found!!")

    results = await Receipt.chefsSelectOptions()
    const chefOptions = results.rows

    results = await RecipeFile.findByRecipeId(recipeId);
    const recipeFilesPromise = results.rows.map(file => File.find(file.file_id));
    results = await Promise.all(recipeFilesPromise);

    let recipeFiles = results.map(result => result.rows[0]);
    recipeFiles = recipeFiles.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`,
    }));

    return res.render("admin/recipes/edit", {
      recipe,
      chefOptions,
      recipeFiles
    })
  },
  async put(req, res) {
    const keys = Object.keys(req.body)
    const recipeId = req.body.id;

    for (key of keys) {
      if (req.body[key] == "" && key != "removed_files") {
        return res.send('Please fill all fields')
      }
    }

    if (req.body.removed_files) {
      try {
        const filesId = req.body.removed_files.split(',');
        const lastIndex = filesId.length - 1;
        filesId.splice(lastIndex, 1);

        const recipeFilesDeletePromise = filesId.map(id => RecipeFile.delete(id))
        await Promise.all(recipeFilesDeletePromise)

        const filesDeletePromise = filesId.map(id => File.delete(id));
        await Promise.all(filesDeletePromise);

      } catch (err) {
        throw new Error(err);
      }
    }

    if (req.files != 0) {
      try {
        const newFilesPromise = req.files.map(file => File.create({ ...file }));
        const results = await Promise.all(newFilesPromise);

        const recipeFiles = results.map(result => result.rows[0]);
        const recipeFilesPromise = recipeFiles.map(file => RecipeFile.create(file.id, recipeId))
        await Promise.all(recipeFilesPromise);
      } catch (err) {
        throw new Error(err);
      }
    }

    try {
      await Receipt.update(req.body);

      return res.redirect(`/admin/recipes/${recipeId}`);
    } catch (err) {
      throw new Error(err);
    }
  },
  async delete(req, res) {
    try {
      const recipeId = req.body.id;
      let results = await RecipeFile.findByRecipeId(recipeId);

      try {
        const recipeFilesDeletePromise = results.rows.map(item => RecipeFile.delete(item.file_id));
        await Promise.all(recipeFilesDeletePromise);
      } catch (err) {
        throw new Error(err)
      }

      try {
        const fileDeletePromise = results.rows.map(item => File.delete(item.file_id));
        await Promise.all(fileDeletePromise);
      } catch (err) {
        throw new Error(err);
      }

      await Receipt.delete(recipeId);
      return res.redirect('/admin/recipes');
    } catch (err) {
      throw new Error(err);
    }
  }
}