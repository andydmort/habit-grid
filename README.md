# Habit-Grid

A simple habit tracker that was mostly vibe coded. This is a simple project that was created so that I could experiment with vibe coding. I was unable to find a habit tracker that allowed me to use the Seinfeld "Don't Break the Chain" habit process. 


# Development

```
npm run dev
```

# Publishing

This app is currently being hosted on Github webpages at https://andydmort.github.io/habit-grid/. To publish new code, do the following.

```
git checkout release
git merge main
npm run build
mv dist/* docs/*
git commit -am "chore: updating the release with main"
git push
```