<!-- ./pages/index.vue -->

<template>
  <!-- begin header -->
  <div>
    <section class="hero is-medium is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Adopt a new user today!</h1>
          <h2
            class="subtitle"
          >You just might need a curious kitten to stare at you as you slap the keyboard tirelessly 😃</h2>
        </div>
      </div>
    </section>
    <!-- end header -->
    <!-- begin main content -->
    <section class="main-content">
      <div class="container">
        <h1 class="title has-text-centered">Available users</h1>
        <div class="columns is-multiline">
          <div class="column is-half" v-for="user in users" :key="user._id">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">{{ user.name }}</p>
              </header>
              <div class="card-content">
                <figure class="image is-3by2">
                  <img :src="`${user.imageUrl}`" />
                </figure>
              </div>
              <footer class="card-footer">
                <nuxt-link :to="`/user/${user._id}`" class="card-footer-item">
                  <button class="button is-dark">Learn more about {{ user.name }}</button>
                </nuxt-link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end main content -->
  </div>
</template>

<!-- ./pages/index.vue -->

<script>
export default {
  head: {
    title: "Home"
  },
  async asyncData(context) {
    try {
      return await fetch("http://localhost:9000/api/users")
        .then(res => res.json())
        .then(data => {
          return { users: data };
        });
    } catch (e) {
      console.error("SOMETHING WENT WRONG :" + e);
    }
  },
  data() {
    return {
      users: []
    };
  }
};
</script>