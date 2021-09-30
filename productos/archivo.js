const { Console } = require('console');

class File{
    fs = require('fs');
    constructor(file){
        this.file = `${__dirname}/${file}`
    }

     read(){
        try{
            const productos = this.fs.readFileSync(this.file, 'utf-8');
            return JSON.parse(productos);
        } catch (err){
            return [];
        }
    }

    async create(producto){
        const productos = await this.read();
        producto.id = productos.length + 1;
        productos.push(producto);
        try{
            await this.fs.promises.writeFile(this.file, JSON.stringify(productos, null, '\t'));
            return producto;
        }
        catch (err){
            return err;
        }
    }

    async update(title, price, thumbnail, index){
        let productos = await this.fs.promises.readFile(this.file, 'utf-8');
        let productosParse = JSON.parse(productos);
        productosParse[index].title=title;
        productosParse[index].price=price;
        productosParse[index].thumbnail=thumbnail;   
        try{
            await this.fs.promises.writeFile(this.file, JSON.stringify(productosParse, null, '\t'));
            return "El producto se actualizo correctamente";
        }
        catch (err){
            return err;
        }
    }

    async delete(productId, index){
        const productos = await this.read();
        if (productos[index].id = productId) {
            productos.splice(1,index)
        }
        try{
            await this.fs.promises.writeFile(this.file, JSON.stringify(productos, null, '\t'));
            return producto;
        }
        catch (err){
            return err;
        } 
    }
}

module.exports = new File('productos.txt');