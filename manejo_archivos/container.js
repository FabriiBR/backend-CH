const fs = require('fs');
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
      const contentJS = await fs.promises.readFile(this.file, 'utf8')
      let content = JSON.parse(contentJS)
      content = content.filter((item) => id !== item.id)
      content = JSON.stringify(content)
      await fs.promises.writeFile(this.file, content)
      console.log('Elemento eliminado!');
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
}

const container = new Container('./container.txt');
//container.getAll().then(obj => console.log(obj))
//container.getById(3).then(obj => console.log(obj))
container.save({title: "namen", price: 10})
//container.deleteById(2)
//container.deleteAll()
