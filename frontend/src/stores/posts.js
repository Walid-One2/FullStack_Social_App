import { defineStore } from "pinia";
import { 
  getPosts, 
  createPost, 
  updatePost as updatePostAPI, 
  deletePost, 
  getUserPosts, 
  toggleLike, 
  getLikeStatus, 
  getComments, 
  createComment, 
  deleteComment 
} from "../api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    userPosts: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === id);
    },
    getUserPostById: (state) => (id) => {
      return state.userPosts.find(post => post.id === id);
    },
  },

  actions: {
    async fetchPosts() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await getPosts();
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        this.error = error.response?.data?.message || "Failed to fetch posts";
      } finally {
        this.isLoading = false;
      }
    },

    async refreshPosts() {
      // Recharger les posts sans afficher le loading (pour les mises à jour silencieuses)
      try {
        const response = await getPosts();
        this.posts = response.data;
      } catch (error) {
        console.error("Error refreshing posts:", error);
        // Ne pas afficher l'erreur pour les rafraîchissements silencieux
      }
    },

    async fetchUserPosts(userId) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await getUserPosts(userId);
        this.userPosts = response.data;
      } catch (error) {
        console.error("Error fetching user posts:", error);
        this.error = error.response?.data?.message || "Failed to fetch user posts";
      } finally {
        this.isLoading = false;
      }
    },

    async addPost(postData) {
      try {
        const response = await createPost(postData);
        this.posts.unshift(response.data); // Ajouter au début de la liste
        return response.data;
      } catch (error) {
        console.error("Error creating post:", error);
        this.error = error.response?.data?.message || "Failed to create post";
        throw error;
      }
    },

    async updatePost(postId, postData) {
      try {
        const response = await updatePostAPI(postId, postData);
        
        // Mettre à jour le post dans la liste des posts
        const postIndex = this.posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          this.posts[postIndex] = response.data;
        }
        
        // Mettre à jour le post dans la liste des posts utilisateur
        const userPostIndex = this.userPosts.findIndex(post => post.id === postId);
        if (userPostIndex !== -1) {
          this.userPosts[userPostIndex] = response.data;
        }
        
        return response.data;
      } catch (error) {
        console.error("Error updating post:", error);
        this.error = error.response?.data?.message || "Failed to update post";
        throw error;
      }
    },

    async removePost(postId) {
      try {
        await deletePost(postId);
        this.posts = this.posts.filter(post => post.id !== postId);
        this.userPosts = this.userPosts.filter(post => post.id !== postId);
      } catch (error) {
        console.error("Error deleting post:", error);
        this.error = error.response?.data?.message || "Failed to delete post";
        throw error;
      }
    },

    async togglePostLike(postId) {
      try {
        console.log('Store: Toggling like for post:', postId);
        const response = await toggleLike(postId);
        console.log('Store: Like response:', response.data);
        
        const post = this.posts.find(p => p.id === postId);
        const userPost = this.userPosts.find(p => p.id === postId);
        
        if (post) {
          post.likesCount = response.data.likesCount;
          console.log('Store: Updated post likes count:', post.likesCount);
        }
        if (userPost) {
          userPost.likesCount = response.data.likesCount;
          console.log('Store: Updated user post likes count:', userPost.likesCount);
        }
        
        return response.data;
      } catch (error) {
        console.error("Store: Error toggling like:", error);
        console.error("Store: Error details:", error.response?.data);
        this.error = error.response?.data?.message || "Failed to toggle like";
        throw error;
      }
    },

    async getPostComments(postId) {
      try {
        const response = await getComments(postId);
        return response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
        this.error = error.response?.data?.message || "Failed to fetch comments";
        throw error;
      }
    },

    async addComment(postId, content) {
      try {
        const response = await createComment(postId, content);
        
        // Mettre à jour le compteur de commentaires
        const post = this.posts.find(p => p.id === postId);
        const userPost = this.userPosts.find(p => p.id === postId);
        
        if (post) {
          post.commentsCount = (post.commentsCount || 0) + 1;
        }
        if (userPost) {
          userPost.commentsCount = (userPost.commentsCount || 0) + 1;
        }
        
        return response.data;
      } catch (error) {
        console.error("Error creating comment:", error);
        this.error = error.response?.data?.message || "Failed to create comment";
        throw error;
      }
    },

    async removeComment(commentId, postId) {
      try {
        await deleteComment(commentId);
        
        // Mettre à jour le compteur de commentaires
        const post = this.posts.find(p => p.id === postId);
        const userPost = this.userPosts.find(p => p.id === postId);
        
        if (post) {
          post.commentsCount = Math.max(0, post.commentsCount - 1);
        }
        if (userPost) {
          userPost.commentsCount = Math.max(0, userPost.commentsCount - 1);
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        this.error = error.response?.data?.message || "Failed to delete comment";
        throw error;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});

: chore: configuration de la base de données MySQL - 2025-08-21T19:00:00 

: feat(backend): création de l'entité Post - 2025-08-24T15:28:00 

: feat(backend): ajout de la propriété content à Post - 2025-08-24T19:43:00 

: feat(backend): ajout du champ media à Post - 2025-08-25T09:37:00 

: feat(backend): ajout de la relation ManyToOne Post->User (author) - 2025-08-25T13:45:00 

: feat(backend): création du PostRepository - 2025-08-25T14:57:00 

: feat(backend): ajout de la relation Comment->Post - 2025-08-26T14:08:00 

: feat(backend): création du CommentRepository - 2025-08-26T15:31:00 

: feat(backend): ajout de la relation Like->Post - 2025-08-27T11:32:00 

: feat(backend): ajout de la contrainte unique (user, post) - 2025-08-27T14:44:00 

: feat(backend): création de l'entité Follow - 2025-08-27T16:52:00 

: feat(backend): implémentation de l'endpoint POST /api/user/register - 2025-08-29T16:04:00 

: feat(backend): implémentation de l'endpoint POST /api/login - 2025-08-29T18:03:00 

: feat(frontend): création du fichier api.js avec Axios - 2025-09-01T11:44:00 

: style(frontend): stylisation du formulaire de connexion - 2025-09-01T16:28:00 

: feat(frontend): création de la vue Register.vue - 2025-09-01T19:20:00 

: feat(backend): création du PostController - 2025-09-02T16:19:00 

: feat(backend): implémentation de POST /api/posts (création) - 2025-09-02T18:02:00 

: feat(backend): validation des données de post - 2025-09-03T11:59:00 

: feat(backend): implémentation de GET /api/posts (liste) - 2025-09-03T13:04:00 

: feat(backend): tri chronologique des posts - 2025-09-03T13:08:00 

: feat(backend): implémentation de GET /api/posts/{id} - 2025-09-03T16:35:00 

: feat(backend): implémentation de PUT /api/posts/{id} - 2025-09-03T16:53:00 

: feat(backend): implémentation de DELETE /api/posts/{id} - 2025-09-04T10:30:00 

: feat(backend): implémentation de DELETE /api/posts/{id} - 2025-09-04T10:30:00 

: feat(backend): implémentation de GET /api/posts/user/{userId} - 2025-09-04T11:56:00 

: feat(backend): implémentation de POST /api/posts/{id}/like (toggle) - 2025-09-04T16:21:00 

: feat(backend): implémentation de GET /api/posts/{id}/like - 2025-09-05T11:13:00 

: feat(backend): implémentation de GET /api/posts/{id}/likes - 2025-09-05T11:50:00 

: feat(backend): implémentation de GET /api/posts/{id}/comments - 2025-09-05T16:19:00 

: feat(backend): implémentation de POST /api/posts/{id}/comments - 2025-09-06T09:16:00 

: feat(frontend): création du store posts.js - 2025-09-06T18:03:00 

: feat(frontend): implémentation de fetchPosts - 2025-09-06T18:11:00 

: feat(frontend): implémentation de createPost - 2025-09-06T18:48:00 

: feat(frontend): implémentation de deletePost - 2025-09-07T09:12:00 

: feat(frontend): chargement des posts au montage - 2025-09-07T09:45:00 

: feat(frontend): création du composant PostCard.vue - 2025-09-07T15:27:00 

: style(frontend): stylisation de la carte de post - 2025-09-07T18:33:00 

: feat(backend): implémentation de POST /api/users/{id}/follow - 2025-09-08T15:17:00 

: feat(frontend): affichage des compteurs (posts, followers, following) - 2025-09-10T19:10:00 

: feat(frontend): chargement des posts de l'utilisateur - 2025-09-11T09:10:00 

: feat(frontend): mise à jour des compteurs en temps réel - 2025-09-11T11:55:00 

: feat(backend): ajout des relations recipient, actor, post - 2025-09-12T19:26:00 

: feat(backend): tri par date décroissante - 2025-09-13T15:56:00 

: feat(backend): implémentation de POST /api/notifications/mark-all-read - 2025-09-13T17:21:00 

: feat(backend): éviter notification si l'auteur like son propre post - 2025-09-14T14:37:00 

: feat(backend): éviter notification si l'auteur commente son post - 2025-09-14T17:59:00 

: feat(frontend): gestion du compteur de non lues - 2025-09-15T18:11:00 

: style(frontend): design du dropdown de notifications - 2025-09-16T12:15:00 

: feat(backend): ajout support stickers dans Message - 2025-09-17T11:40:00 

: feat(backend): création du ChatController - 2025-09-17T17:31:00 

: feat(backend): implémentation de POST /api/chat/conversations/{id}/messages - 2025-09-18T16:13:00 

: feat(backend): incrémentation des messages non lus - 2025-09-19T12:02:00 

: feat(backend): implémentation de POST /api/chat/conversations/{id}/read - 2025-09-19T12:19:00 

: feat(backend): implémentation de POST /api/chat/conversations/{id}/read - 2025-09-19T12:19:00 

: feat(backend): implémentation de GET /api/chat/stickers - 2025-09-19T13:00:00 

: feat(backend): implémentation de POST /api/chat/online-status - 2025-09-19T14:14:00 

: feat(frontend): affichage du statut en ligne - 2025-09-20T16:18:00 

: feat(frontend): support des stickers - 2025-09-21T18:53:00 

: style(frontend): animations des messages - 2025-09-22T18:59:00 

: feat(backend): implémentation de POST /api/user/forgot-password - 2025-09-24T11:27:00 

: feat(backend): implémentation de POST /api/user/reset-password - 2025-09-24T17:58:00 

: feat(frontend): redirection automatique vers login après 10s - 2025-09-26T11:00:00 

: feat(backend): indexation des utilisateurs - 2025-09-27T12:21:00 

: feat(backend): indexation des posts - 2025-09-27T16:09:00 

: feat(frontend): suggestions en temps réel - 2025-09-28T10:49:00 

: feat: création de dashboards Kibana - 2025-09-28T14:48:00 

: feat(backend): installation symfony/mercure-bundle - 2025-09-29T12:33:00 

: feat(backend): publication update lors nouveau post - 2025-09-29T16:12:00 

: feat(frontend): souscription Mercure pour notifications - 2025-09-29T18:48:00 

: feat(backend): implémentation de POST /api/upload/image - 2025-09-30T19:27:00 
