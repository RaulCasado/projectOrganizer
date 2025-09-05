Revisar la logica de IdeasMainViewContext y en general revisar que los hooks y context esten en las carpetas correctas.

1. 🏁 Component render → crea nuevo taskForm
2. 🔄 taskForm.resetForm es una nueva función 
3. 👀 useEffect ve que resetForm cambió
4. ⚡ useEffect ejecuta → llama taskForm.resetForm()
5. 🔄 resetForm trigger un setState interno
6. 🏁 setState causa re-render
7. 🔄 Re-render crea nuevo taskForm...
8. 🔄 Nueva función resetForm...
9. 🔄 useEffect ejecuta otra vez...
10. ♾️ BUCLE INFINITO


IdeaList IdeaItem ProjectIdeaFIlters IdeaItem ProjectList y taskfilter tienen muchas props habria que revisarlo. Revisar los sketches