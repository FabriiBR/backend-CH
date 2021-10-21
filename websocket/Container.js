const fs = require("fs")
class Container {
  constructor(file){
    this.file = file;
  }

  async getById(id){
    try {
      const contentJS = await fs.promises.readFile(this.file, 'utf8')
      let content = JSON.parse(contentJS)
      let item = content.find((item) => id === item.id)
      return item
    } catch(err) {
      console.error(err);
    }
  }

  async getAll(){
    try{
      const contentJS = await fs.promises.readFile(this.file, 'utf8')
      let content = JSON.parse(contentJS)
      return content;
    } catch(err) {
      console.error(err)
    }
    
  }

  async save(obj){
    try{
      let json = await fs.promises.readFile(this.file, 'utf8')
      let content = JSON.parse(json)
      if(content.length > 0){
        obj.id = (content[content.length - 1].id + 1)
        content.push(obj)
      } else {
        obj.id = 1
        content.push(obj)
      }
      content = JSON.stringify(content)
      await fs.promises.writeFile(this.file, content)
    } catch(err) {
      await fs.promises.writeFile(this.file, '[\n]')
      let json = await fs.promises.readFile(this.file, 'utf8')
      let content = JSON.parse(json)
      obj.id = 1
      content = JSON.stringify(content)
      await fs.promises.writeFile(this.file, content)
    }
    
  }

  async deleteById(id){
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
      let content = JSON.parse(contenido)
      
      content = content.filter((item) => id !== item.id)

      if (!content) {
        console.error(`Elemento con el id: '${id}' no fue encontrado`);
        return null;
      }

      const contentJS = JSON.stringify(content)
      await fs.promises.writeFile(this.file, contentJS)
      return content

    } catch(err) {
      console.error(err);
    }
  }

  async deleteAll(){
    try{
      await fs.promises.writeFile(this.file, '[\n]')
      console.log('Todo a sido eliminado!');
    } catch(err) {
      console.error(err);
    }
  }

  async update(id, product) {
    const productsList = await this.getAll()
    const productSaved = productsList.find((item) => item.id === id)
    const indexProduct = productsList.findIndex((item) => item.id === id)

    if (!productSaved) {
      console.error(`Elemento con el id: '${id}' no fue encontrado`);
      return null;
    }

    const productUpdated = {
      ...productSaved,
      ...product
    }

    productsList[indexProduct] = productUpdated

    const productsJSON = JSON.stringify(productsList, null, 2)
    await fs.promises.writeFile(`./${this.file}`, productsJSON)

    return productUpdated
  }
}

module.exports = Container