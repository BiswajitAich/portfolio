const isMobile = (): boolean => {
    console.log("isMobile--check");

    if (typeof window !== 'undefined'){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 425;
    }
    return false;
}
export default isMobile;