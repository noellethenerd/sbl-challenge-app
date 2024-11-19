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
    return Object.keys(uniqueSeq).map(seq => {
      return <div>{seq}: {uniqueSeq[seq]} Occurrence(s)</div>
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

  findSeqWithThresh(threshold?) {
    let uniqueSeq = {};
    this.props.sequences.map(seq => {
      if (uniqueSeq[seq]) {
        uniqueSeq[seq] += 1;
      }
      else if (!uniqueSeq[seq] && Object.values(uniqueSeq).length != 0) {
        (this.findBaseDifferences(seq, Object.keys(uniqueSeq)[0])).length <= threshold ? uniqueSeq[Object.keys(uniqueSeq)[0]] += 1: uniqueSeq[seq] = 1;
    }
      else uniqueSeq[seq] = 1;
    })
    return Object.keys(uniqueSeq).map(seq => {
      return <div>{seq}: {uniqueSeq[seq]} Occurrence(s)</div>
    })
  }

  deduplicate(threshold?) {
    if (!threshold) {
      return this.findUniques() 
    }
    else {
      return this.findSeqWithThresh(threshold);
    }
}
  
  render() { 
    return (
      <div className="Dedupe">
        Deduplication
        <div>
          Raw Sequences:
            {this.displaySequences()}
        </div>
        <div>
          Unique Sequences:
            {this.deduplicate()}
        </div>
        <div>
          Threshold of 1:
            {this.deduplicate(1)}
        </div>
        <div>
          Threshold of 2:
            {this.deduplicate(2)}
        <button>Click</button>
        </div>
    </div>
    )
  }
}

export default Dedupe;

