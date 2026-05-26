---
title: Scratch
fileOrder: 3
card_icon: /assets/img/code/scratch_icon.svg
sidebar: false
---

## Settings and Setup

- Always give the project an appropriate name.
- Use the High Contrast Colour Mode for improved readability.

![Selecting High Contrast Blocks and naming a project](../assets/img/code/scratch/project-name.png)

## Editor Terminology

- Follow these provided naming conventions for consistency. 
![Labeled scratch editor](../assets/img/code/scratch/scratch-interface.png)

## Naming Conventions

- **Sprites and Backdrops:** Use descriptive names reflecting their role or appearance. Rename defaults like "sprite1" to "hero" or "player".
- **Case:** Use lower case for all names. Separate words with spaces rather than underscores or capital letters.
- **Variables and Lists:** Choose clear and descriptive names, such as "score" or "enemy list".

![A block which changes the "cat score" variable by 1](../assets/img/code/scratch/change_variable.png)

## Organisation of Code

- **Scripts Arrangement:** Organise scripts logically, grouping related blocks together to enhance readability and debugging.
- **Use of Comments:** Utilise Scratch's built-in comments on blocks when necessary, particularly in starter projects or instructions, to provide additional clarity.

  ![Scratch block with menu to add comment](../assets/img/code/scratch/add-comment.png)

  ![Scratch block with comment attached](../assets/img/code/scratch/move_comment.png)

## Event Handling

- **Single Event Listener:** Prefer using one *when green flag clicked* block per sprite to initiate actions. Manage multiple behaviours within this script using control blocks.
	![when green flag clicked](../assets/img/code/scratch/scratch_green_flag_click.png)
- **Broadcasting Messages:** Utilise broadcasts to communicate clearly between sprites. Name broadcasts meaningfully.

## Control Structures

- **Loops:** Use *repeat* or *forever* loops appropriately. Ensure loops have clear exit conditions to prevent infinite loops unintentionally.
	![repeat](../assets/img/code/scratch/scratch_repeat.png)![forever](../assets/img/code/scratch/scratch_forever.png)
- **Conditional Statements:** Use *if..then* and *if..then..else* blocks for clear and simple decision-making logic.
	![if](../assets/img/code/scratch/scratch_if.png) ![if-else](../assets/img/code/scratch/scratch_elseif.png)

## Motion and Positioning

- **Coordinate System:** Be mindful of Scratch’s coordinate system, where ![0, 0](../assets/img/code/scratch/scratch_0_0.png) is the centre. Clearly position sprites using x ![x](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%2380B5FF&textColor=%23000000&fontFamily=roboto&width=7&height=14&text=x) and ![y](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%2380B5FF&textColor=%23000000&fontFamily=roboto&width=7&height=14&text=y) coordinates.
- **Initialisation:** Always initialise x,y ![x, y](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%2380B5FF&textColor=%23000000&fontFamily=roboto&width=28&height=14&text=x%2C%20y) positions and ![direction](../assets/img/code/scratch/scratch_direction.png) using code blocks, rather than by using the user interface.
  ![scratch block to set a sprite's position](../assets/img/code/scratch/set_xy.png)
  ![scratch block to set a sprite's x position](../assets/img/code/scratch/set_x.png)
  ![scratch block to set a sprite's y position](../assets/img/code/scratch/set_y.png)
  ![scratch block to set a sprite's direction](../assets/img/code/scratch/set_direction.png)

- **Rotation Style:** Set rotation styles appropriately using code blocks (![don't rotate](../assets/img/code/scratch/scratch_dont_rotate.png),![left-right](../assets/img/code/scratch/scratch_left.png), or ![all around](../assets/img/code/scratch/scratch_around.png)) for expected behaviour during motion.

  ![scratch block to set a sprite's rotation style](../assets/img/code/scratch/set_rotation.png)

## Looks and Sounds

- **Costume Naming:** Clearly name costumes based on their purpose or action, like "walking 1" or "jumping pose".
- **Sound Management:** Name sounds based on function (e.g., "jump sound", "background music"). Keep audio clips concise to maintain performance.
- **Initialisation:** Always initialise ![size](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23CCB3FF&textColor=%23000000&fontFamily=roboto&width=28&height=14&text=size) using code blocks, rather than by using the user interface.

  ![scratch block to set a sprite's size](../assets/img/code/scratch/set_size.png)

## Variables and Lists

- **Scope:** Determine appropriate scope (sprite-specific or global) based on usage context. Use **global** scope as default unless sprite-specific is absolutely required.
- **Initialisation:** Always initialise variables at the beginning of scripts to ensure they have defined initial values.

  ![scratch block setting score variable to 0](../assets/img/code/scratch/set_score.png)

## My Blocks

> [!WARNING]
> Avoid the use of My Blocks unnecessarily.
> - They can add **[cognitive load](QR01.md)** and make projects harder to follow.  
> - Many tasks are already covered by existing Scratch blocks, adding custom blocks may create duplication and confusion.  
> - Overuse reduces clarity: students may struggle to see how actions map directly to Scratch’s core blocks.  

- **Purpose:** Use My Blocks only for repetitive code or complex functionalities, promoting modularity. 
- **Naming:** Name My Blocks descriptively, clearly indicating their function, such as "move to start position" or "check collision".

## Instructional style

**Highlighting**: Highlight text that refers to a block using the colour associated with that block. (e.g) ![go to x:100 y:50](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%2380B5FF&textColor=%23000000&fontFamily=roboto&width=112&height=14&text=go%20to%20x%3A100%20y%3A50), ![delete this clone](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23FFBE4C&textColor=%23000000&fontFamily=roboto&width=119&height=14&text=delete%20this%20clone)

**Sprite identity**: Include an image of the sprite that the script is attached to.

  ![player one sprite](../assets/img/code/scratch/player_one.png)

  ![A short program to move a sprite and display a message](../assets/img/code/scratch/instructional_style.png)

**Scratchblocks**: Use [Scratchblocks](https://scratchblocks.github.io/#?style=scratch3&script=) to create PNG code blocks for online use or SVG code blocks for printed use. Save the code used for easy maintenance of the instructions. 

Scratchblocks can be saved as a [URL](https://scratchblocks.github.io/#?style=scratch3&script=when%20flag%20clicked%0Ago%20to%20x%3A(0)%20y%3A(0)%0Aturn%20cw%20(15)%20degrees%0Asay%20%5Bhello%5D%0A), for example:

```html
https://scratchblocks.github.io/#?style=scratch3&script=when%20flag%20clicked%0Ago%20to%20x%3A(0)%20y%3A(0)%0Aturn%20cw%20(15)%20degrees%0Asay%20%5Bhello%5D%0A
```

## Text Highlighting

Scratch palette for text highlighting:

| Block type | Colour                                                                                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| motion     | ![#80B5FF](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%2380B5FF&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%2380B5FF) |
| looks      | ![#CCB3FF](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23CCB3FF&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%23CCB3FF) |
| sound      | ![#E19DE1](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23E19DE1&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%23E19DE1) |
| events     | ![#FFD966](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23FFD966&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%23FFD966) |
| control    | ![#FFBE4C](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23FFBE4C&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%23FFBE4C) |
| sensing    | ![#85C4E0](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%2385C4E0&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%2385C4E0) |
| operators  | ![#7ECE7E](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%237ECE7E&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%237ECE7E) |
| variables  | ![#FFA54C](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23FFA54C&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%23FFA54C) |
| myblocks   | ![#FF99AA](https://images.placeholders.dev/?dy=5&fontSize=14&fontWeight=400&bgColor=%23FF99AA&textColor=%23000000&fontFamily=roboto&width=63&height=14&text=%23FF99AA) |
