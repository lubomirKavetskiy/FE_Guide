const TwoSum = function() {
  this.list = [];
};

TwoSum.prototype.add = function(number) {
	this.list.push(number);
};

//O(n^2)
TwoSum.prototype.find = function(value) {
	for(let j=0; j<this.list.length; j++) {
		for(let i=j+1; i<this.list.length; i++) {
        	if(this.list[j] + this.list[i] === value) return true;
        }
    }

	return false;
};

const obj = new TwoSum();
obj.add(1);
obj.add(3);
obj.add(1);
obj.add(5);

obj.find(4); //true
obj.find(7); //false
obj.find(2); //true
obj.find(8); //true
      
//O(n)    
TwoSum.prototype.find = function(value) {
	for(let [key, value] of list) {
        const diff = sum - key;

        if(diff === key) {
          return value > 1 
        } else {
          if(list.get(diff)) return true;
        }
    };

    return false;
};
