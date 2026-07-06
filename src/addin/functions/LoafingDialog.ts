let intervalId: number;

export function loadingDialog(){
    const points = document.querySelector('div #point-state') as HTMLElement
    intervalId = setInterval(() => {
        points.textContent.length === 3 
        ? points.textContent = '.'
        : points.textContent += '.'
    }, 500)
}

export function disconnectLoadingDialog(){
    clearInterval(intervalId as number)
}