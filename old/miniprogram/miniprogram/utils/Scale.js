var xMove, yMove, distance

xMove = e.touches[1].clientX - e.touches[0].clientX;
yMove = e.touches[1].clientY - e.touches[0].clientY;
distance = Math.sqrt(xMove * xMove + yMove * yMove);