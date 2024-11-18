import { Component } from 'react';
import React from 'react';

class Dedupe extends Component {

  displaySequences() { 
    return this.props.sequences.map(element => {
      return <div>
        {element}
      </div>
    });
  }

  findUniques() {
    let uniqueSeq = {};
    this.props.sequences.map(seq => {
      uniqueSeq[seq] ? uniqueSeq[seq] += 1 : uniqueSeq[seq] = 1
    });
    console.log('uniseq: ', uniqueSeq);
    return Object.keys(uniqueSeq).map(seq => {
      return <div>{seq}: {uniqueSeq[seq]} Occurrences</div>
    })
  }

  findBaseDifferences(str1: string, str2: string) {
    const maxLength = Math.max(str1.length, str2.length);
    const diff: string[] = [];

    Array.from({length: maxLength}).forEach((_, i)=>{
      if (str1[i] !== str2[i]) {
        diff.push(`Base ${i}: '${str1[i] || ' '} vs '${str2[i] || ' '}`);
      }
    });
    return diff;
  }

  deduplicate(threshold?) {
    if (!threshold) {
      return this.findUniques() 
    }
    else {
      console.log(this.findBaseDifferences('ACTGCTAGCTAGCT', 'ACTGCTAGCTAGCA'));
      return (<div>Test</div>)
    }
}
  
  render() { 
    return (
      <div className="Dedupe">
        Deduplication
        <div>
          Sequences:
            {this.displaySequences()}
        </div>
        <div>
          Unique Sequences:
            {this.deduplicate()}
        </div>
        <div>
          Threshold 1:
            {this.deduplicate(1)}
        <button>Click</button>
        </div>
    </div>
    )
  }
}

export default Dedupe;

