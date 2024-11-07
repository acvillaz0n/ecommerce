export class ProductMockBuilder{
    id= 1;
    title= "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops";
    price= 109.95;
    description= "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday";
    category= "men's clothing";
    image= "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg";
    rating= { rate: 3.9, count: 120 };
    quantity= 2;

    withId(id:number){
        this.id=id;
        return this;
    }
    
    withTitle(title:string){
        this.title=title;
        return this;
    }
    
    withPrice(price:number){
        this.price=price;
        return this;
    }
    
    withDescription(description:string){
        this.description=description;
        return this;
    }
    
    withCategory(category:string){
        this.category=category;
        return this;
    }
    
    withImage(image:string){
        this.image=image;
        return this;
    }
    
    withRating(rating:{rate:number, count:number}){
        this.rating=rating;
        return this;
    }

    withQuantity(quantity:number){
        this.quantity=quantity;
        return this;
    }

    build(){
        return {
            id:this.id,
            title:this.title,
            price:this.price,
            description:this.description,
            category:this.category,
            image:this.image,
            rating:this.rating,
            quantity:this.quantity,
        }
    }
} 
