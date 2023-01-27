"use strict"
window.onload = function()
{
  let cellCount = document.querySelectorAll(".cell").length;
  let currentTile = null;
  let selectedCell = null;
  let under = null;
  let winArray = new Array(cellCount);
  for (let i = 0; i < cellCount; i++)
  {
    document.querySelector("body").insertAdjacentHTML('beforeend',"<div class=\"tile\"> </div>");
    document.querySelectorAll(".tile")[i].addEventListener("mousedown", dragItem);
    document.querySelectorAll(".tile")[i].addEventListener("mouseout", dragItem);
    document.querySelectorAll(".tile")[i].addEventListener("mouseup", dragItem);
    document.querySelectorAll(".cell")[i].id = i;
    document.querySelectorAll(".cell")[i].addEventListener("mousedown", debug);
  }
  let counter = 0;
  for (let i = 0; i < 6; i++)
  {
    for (let j = 0; j < 9; j++)
    {
      let tile = document.querySelectorAll(".tile")[counter];
      tile.style.top = Math.random() * 500 + "px";
      tile.style.left = Math.random() * 300 + "px";
      tile.style.backgroundPositionX = 450 - (j * 50) + "px";
      tile.style.backgroundPositionY = 300 -( i * 50) + "px";
      tile.id = counter;
      counter ++;
    }
  }

  function debug(event)
  {
    console.log(event.currentTarget.id);
  }

  function dragItem(event)
  {
    event.preventDefault();
    if (event.type == "mousedown")
    {

      event.currentTarget.removeEventListener("mousedown", dragItem);
      event.currentTarget.addEventListener("mousemove", dragItem);
      currentTile = event.currentTarget;
      currentTile.style.zIndex = 9;
      console.log(currentTile.id);
      return;
    }
    if (event.type == "mousemove")
    {

      currentTile.hidden = true;
      selectedCell = document.elementFromPoint(event.clientX, event.clientY);
      if (selectedCell != under && under != null  )
        under.classList.remove("selected");
      under = selectedCell.closest(".cell");
      if (under != null)
      {
        under.classList.add("selected");
        winArray[under.id] = false;
      }
      currentTile.hidden = false;
        currentTile.style.top = event.clientY - 25 + "px";
        currentTile.style.left = event.clientX - 25 + "px";

    }
    if (event.type == "mouseout" || event.type == "mouseup")
    {
      event.currentTarget.addEventListener("mousedown", dragItem);
      event.currentTarget.removeEventListener("mousemove", dragItem);
      if (under != null)
        under.classList.remove("selected");
      if (under != null && event.type == "mouseup")
      {
        place(currentTile, under);
      }
      if( currentTile != null)
        currentTile.style.zIndex = 1;
    }

  }

  function place(tile, cell)
  {
    if (tile != null && cell != null)
    {
      tile.style.left = cell.getBoundingClientRect().left + 'px';
      tile.style.top = cell.getBoundingClientRect().top + 'px';
      if (tile.id == cell.id)
      {
        winArray[tile.id] = true;
      }
      else
      {
        winArray[tile.id] = false;
      }
      checkWin();
    }
  }

  function checkWin()
  {
    let i = 0;
    while (winArray[i])
    {
      i++;
      if (i == cellCount - 1)
        alert("ПОБЕДА");
    }
  }
}
