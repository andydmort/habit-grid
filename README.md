# Habit-Grid

A habit tracker inspired by Jerry Seinfeld's "Don't Break the Chain" method. This project emerged from my search for a simple habit tracking tool that implements this effective technique. I built it while experimenting with vibe coding.


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

# TODO