class Article {
  constructor(title, creator) {
    this.title = title;
    this.creator = creator;
    this._comments = [];
    this._likes = [];
  }

  get likes() {
    if (this._likes.length == 0) {
      return `${this.title} has 0 likes`;
    } else if(this._likes.length == 1) {
      return `${this._likes[0]} likes this article!`;
    } else {
      return `${this._likes[0]} and ${this._likes.length - 1} others like this article!`;
    }
  }

  like(username) {
    for (let i = 0; i < this._likes.length; i++) {
      if(username == this._likes[i]) {
        throw new Error("You can't like the same article twice!");
      }
    }

    if(this.creator == username) {
      throw new Error("You can't like your own articles!");
    }

    this._likes.push(username);
    return `${username} liked ${this.title}!`;
  }

  dislike(username) {
    for (let i = 0; i < this._likes.length; i++) {
      if(username == this._likes[i]) {
        this._likes.pop(this._likes[i]);
        return `${username} disliked ${this.title}`;
      }
    }

    throw new Error("You can't dislike this article!");
  }

  comment (username, content, id) {
    if(id == undefined || id <= 0 || id > this._comments.length) { 
      let comment = {'Id': this._comments.length + 1, 'Username': username, 'Content': content, 'Replies': []};
      this._comments.push(comment);
      return `${username} commented on ${this.title}`;
    } else {
      let comment = this._comments.findIndex(x => x.Id == id);
      let reply = {Id: `${id}.${this._comments[comment]['Replies'].length + 1}`, 'Username': username, 'Content': content};
      this._comments[comment]['Replies'].push(reply);
      return "You replied successfully";
    }
  }

  toString(sortingType) {
    let str = '';
    str += `Title: ${this.title}\n`;
    str += `Creator: ${this.creator}\n`;
    str += `Likes: ${this._likes.length}\n`;
    str += 'Comments:\n';

    if(sortingType == 'asc') {
      this._comments.sort((a, b) => {
        a.Id - b.Id;
      });

      for (let i = 0; i < this._comments.length; i++) {
        this._comments[i].Replies.sort((a, b) => {
        if(a.Id < b.Id) { return -1; }
        if(a.Id > b.Id) { return 1; }
      });
      }
      
    } else if(sortingType == 'desc') {
      this._comments.sort((a, b) => {
        if(a.Id > b.Id) { return -1; }
        if(a.Id < b.Id) { return 1; }
      });

      for (let i = 0; i < this._comments.length; i++) {
        this._comments[i].Replies.sort((a, b) => {
        if(a.Id > b.Id) { return -1; }
        if(a.Id < b.Id) { return 1; }
      });
      }
    } else if(sortingType == 'username') {
      this._comments.sort((a, b) => {
        if(a.Username < b.Username) { return -1; }
        if(a.Username > b.Username) { return 1; }
      });

      for (let i = 0; i < this._comments.length; i++) {
        this._comments[i].Replies.sort((a, b) => {
        if(a.Username < b.Username) { return -1; }
        if(a.Username > b.Username) { return 1; }
      });
      }
      
    }
    
    for (let i = 0; i < this._comments.length; i++) {
      str += `-- ${this._comments[i].Id}. ${this._comments[i].Username}: ${this._comments[i].Content}\n`;

      for(let j = 0; j < this._comments[i].Replies.length; j++) {
        str += `--- ${this._comments[i].Replies[j].Id}. ${this._comments[i].Replies[j].Username}: ${this._comments[i].Replies[j].Content}\n`;
      }
    }

    return str.trim();
  }

}

let art = new Article("My Article", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));
