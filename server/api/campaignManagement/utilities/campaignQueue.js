class Node{
  constructor(value){
    this.value = value;
    this.next = null

  }
}

class CampaignQueue {
  constructor(){
    this.head = null;
    this.tail = null
  }

  enqueue(value){
    const formerTail = this.tail
    const newTail = new Node(value)
    this.tail = newTail

    if (!formerTail){
     this.head = newTail
    } else {
      formerTail.next = newTail
    }
  }

  dequeue(){
    const removedHead = this.head
    this.head = removedHead.next

    if (!this.head){
      this.tail = null
    }
    return removedHead
  }

  length(){
    let counter = 0
    let current = this.head
    while(current){
      counter++
      current = current.next
    }

    return counter
  }
}

module.exports = CampaignQueue