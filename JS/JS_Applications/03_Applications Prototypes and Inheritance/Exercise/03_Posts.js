function solve() {
  class Post {
    constructor(title, content) {
      this.title = title;
      this.content = content;
    }

    toString() {
      let result = `Post: ${this.title}\n`;
      result += `Content: ${this.content}`;

      return result;
    }
  }

  class SocialMediaPost extends Post {
    constructor(title, content, likes, dislikes) {
      super(title, content);
      this.likes = likes;
      this.dislikes = dislikes;
      this.comments = [];
    }

    addComment(comment) {
      this.comments.push(comment);
    }

    toString() {
      let result = super.toString();
      result += `\nRating: ${this.likes - this.dislikes}\n`;
      if(this.comments.length != 0) {
        result += 'Comments:\n';

        for (let i = 0; i < this.comments.length; i++) {
          const comment = this.comments[i];
          result += ` * ${comment}\n`;
        }
      }

      return result.trim();
    }
  }

  class BlogPost extends Post {
    constructor(title, content, views) {
      super(title, content);
      this.views = views;
    }

    view() {
      this.views += 1;
      return this;
    }

    toString() {
      let result = super.toString();
      result += `\nViews: ${this.views}`;
      return result;
    }
  }

  return {
    Post,
    SocialMediaPost,
    BlogPost
  };
}